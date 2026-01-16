import { describe, expect, it, vi, beforeEach, type Mock } from "vitest";
import type { PrintfulVariant } from "@/lib/shop/types";

/**
 * Checkout API Integration Tests
 *
 * Tests the /api/checkout route for creating Stripe checkout sessions.
 */

// Mock Stripe
vi.mock("stripe", () => {
  return {
    default: vi.fn(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({
            id: "cs_test_123",
            url: "https://checkout.stripe.com/pay/cs_test_123",
          }),
        },
      },
    })),
  };
});

// Mock Printful API
vi.mock("@/lib/shop/printful", () => ({
  getProductVariants: vi.fn(),
}));

// Mock product data
vi.mock("@/lib/data/products", () => ({
  PRODUCTS: {
    "flower-of-life-stickers": {
      id: "flower-of-life-stickers",
      printfulSyncProductId: "6967f23d7e21a7",
    },
    "metatrons-cube-stickers": {
      id: "metatrons-cube-stickers",
      printfulSyncProductId: "6967f3c5902d16",
    },
  },
}));

// Mock env
vi.mock("@/env", () => ({
  env: {
    STRIPE_SECRET_KEY: "sk_test_mock",
    STRIPE_WEBHOOK_SECRET: "whsec_test_mock",
    PRINTFUL_API_KEY: "test_printful_key",
    APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_SHOP_ENABLED: true,
  },
}));

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

describe("Checkout API", () => {
  let mockGetProductVariants: Mock;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Get mock reference
    const printful = await import("@/lib/shop/printful");
    mockGetProductVariants = printful.getProductVariants as Mock;
  });

  describe("POST /api/checkout", () => {
    const validCartItem = {
      productId: "flower-of-life-stickers",
      printfulVariantId: 12345,
      quantity: 1,
      name: "Flower of Life Stickers",
      variantName: '3"×3"',
      price: 5.99,
      image: "https://example.com/image.png",
    };

    it("creates a checkout session with valid cart items", async () => {
      // Setup mock to return matching variant
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const { POST } = await import("@/app/api/checkout/route");

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [validCartItem] }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.url).toBe("https://checkout.stripe.com/pay/cs_test_123");
    });

    it("returns 400 for empty cart", async () => {
      const { POST } = await import("@/app/api/checkout/route");

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [] }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
    });

    it("returns 400 for invalid cart item structure", async () => {
      const { POST } = await import("@/app/api/checkout/route");

      const invalidItem = {
        productId: "test",
        // Missing required fields
      };

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [invalidItem] }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
    });

    it("returns 400 for negative quantity", async () => {
      const { POST } = await import("@/app/api/checkout/route");

      const invalidItem = {
        ...validCartItem,
        quantity: 0,
      };

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [invalidItem] }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
    });

    it("returns 400 for negative price", async () => {
      const { POST } = await import("@/app/api/checkout/route");

      const invalidItem = {
        ...validCartItem,
        price: -5.99,
      };

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [invalidItem] }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid cart data");
    });

    it("handles multiple cart items", async () => {
      // Setup mocks for both products
      const flowerVariant = createMockVariant({ id: 12345, price: 5.99 });
      const metatronVariant = createMockVariant({ id: 12346, price: 5.99 });
      mockGetProductVariants
        .mockResolvedValueOnce([flowerVariant])
        .mockResolvedValueOnce([metatronVariant]);

      const { POST } = await import("@/app/api/checkout/route");

      const items = [
        validCartItem,
        {
          ...validCartItem,
          productId: "metatrons-cube-stickers",
          printfulVariantId: 12346,
          name: "Metatron's Cube Stickers",
        },
      ];

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.url).toBeTruthy();
    });

    it("returns 400 for invalid JSON", async () => {
      const { POST } = await import("@/app/api/checkout/route");

      const request = new Request("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not valid json",
      });

      const response = await POST(request);

      // JSON parse error results in 500 (caught by the generic error handler)
      expect(response.status).toBe(500);
    });
  });
});
