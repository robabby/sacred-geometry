/**
 * Checkout Route Integration Tests
 *
 * Tests the checkout API endpoint with server-side price validation.
 */

import { describe, expect, it, vi, beforeEach, type Mock } from "vitest";
import { POST } from "../route";
import * as printful from "@/lib/shop/printful";
import * as stripeModule from "@/lib/shop/stripe";
import type { PrintfulVariant } from "@/lib/shop/types";

// Mock the Printful module
vi.mock("@/lib/shop/printful", () => ({
  getProductVariants: vi.fn(),
}));

// Mock the Stripe module
vi.mock("@/lib/shop/stripe", () => ({
  createCheckoutSession: vi.fn(),
}));

// Mock product data
vi.mock("@/lib/data/products", () => ({
  PRODUCTS: {
    "metatrons-cube-stickers": {
      id: "metatrons-cube-stickers",
      printfulSyncProductId: "6967f3c5902d16",
    },
  },
}));

// Mock env
vi.mock("@/env", () => ({
  env: {
    APP_URL: "http://localhost:3000",
  },
}));

const mockGetProductVariants = printful.getProductVariants as Mock;
const mockCreateCheckoutSession = stripeModule.createCheckoutSession as Mock;

/**
 * Creates a mock Printful variant
 */
function createMockVariant(overrides: Partial<PrintfulVariant> = {}): PrintfulVariant {
  return {
    id: 12345,
    name: 'Test Sticker - 3"×3"',
    size: '3"×3"',
    color: "Default",
    colorCode: "",
    price: 5.99,
    inStock: true,
    image: "https://example.com/image.png",
    ...overrides,
  };
}

/**
 * Creates a mock Request object
 */
function createMockRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("valid checkout requests", () => {
    it("returns 200 with Stripe session URL for valid request", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);
      mockCreateCheckoutSession.mockResolvedValue({
        url: "https://checkout.stripe.com/session123",
      });

      const request = createMockRequest({
        items: [
          {
            productId: "metatrons-cube-stickers",
            printfulVariantId: 12345,
            quantity: 1,
            name: "Metatron's Cube Stickers",
            variantName: '3"×3"',
            price: 5.99,
            image: "https://example.com/image.png",
          },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.url).toBe("https://checkout.stripe.com/session123");
    });

    it("uses Printful price when client price is tampered", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);
      mockCreateCheckoutSession.mockResolvedValue({
        url: "https://checkout.stripe.com/session123",
      });

      // Client sends tampered price of $0.01
      const request = createMockRequest({
        items: [
          {
            productId: "metatrons-cube-stickers",
            printfulVariantId: 12345,
            quantity: 1,
            name: "Metatron's Cube Stickers",
            variantName: '3"×3"',
            price: 0.01, // TAMPERED!
            image: "https://example.com/image.png",
          },
        ],
      });

      const response = await POST(request);
      expect(response.status).toBe(200);

      // Verify createCheckoutSession was called with validatedPrice (5.99), not tampered price (0.01)
      expect(mockCreateCheckoutSession).toHaveBeenCalledTimes(1);
      const calledWithItems = mockCreateCheckoutSession.mock.calls[0]?.[0];
      expect(calledWithItems[0].validatedPrice).toBe(5.99);
      expect(calledWithItems[0].priceWasAdjusted).toBe(true);
    });
  });

  describe("invalid checkout requests", () => {
    it("returns 400 with validationErrors for invalid product", async () => {
      const request = createMockRequest({
        items: [
          {
            productId: "nonexistent-product",
            printfulVariantId: 12345,
            quantity: 1,
            name: "Nonexistent Product",
            variantName: "Size",
            price: 5.99,
            image: "https://example.com/image.png",
          },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Cart validation failed");
      expect(data.validationErrors).toBeDefined();
      expect(data.validationErrors.length).toBeGreaterThan(0);
      expect(data.validationErrors[0].code).toBe("PRODUCT_NOT_FOUND");
    });

    it("returns 400 for empty cart", async () => {
      const request = createMockRequest({
        items: [],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
    });

    it("returns 400 for malformed request body", async () => {
      const request = createMockRequest({
        items: "not-an-array",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
      expect(data.details).toBeDefined();
    });

    it("returns 400 for missing required fields", async () => {
      const request = createMockRequest({
        items: [
          {
            productId: "metatrons-cube-stickers",
            // Missing other required fields
          },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
    });

    it("returns 400 for out of stock items", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99, inStock: false });
      mockGetProductVariants.mockResolvedValue([variant]);

      const request = createMockRequest({
        items: [
          {
            productId: "metatrons-cube-stickers",
            printfulVariantId: 12345,
            quantity: 1,
            name: "Metatron's Cube Stickers",
            variantName: '3"×3"',
            price: 5.99,
            image: "https://example.com/image.png",
          },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Cart validation failed");
      expect(data.validationErrors[0].code).toBe("OUT_OF_STOCK");
    });
  });

  describe("error handling", () => {
    it("returns 500 when Stripe fails", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);
      mockCreateCheckoutSession.mockRejectedValue(new Error("Stripe error"));

      const request = createMockRequest({
        items: [
          {
            productId: "metatrons-cube-stickers",
            printfulVariantId: 12345,
            quantity: 1,
            name: "Metatron's Cube Stickers",
            variantName: '3"×3"',
            price: 5.99,
            image: "https://example.com/image.png",
          },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to create checkout session");
    });
  });
});
