/**
 * Checkout Validation Unit Tests
 *
 * Tests server-side price validation against Printful's authoritative data.
 */

import { describe, expect, it, vi, beforeEach, type Mock } from "vitest";
import { validateCartItems } from "../checkout-validation";
import * as printful from "../printful";
import type { CartItem, PrintfulVariant } from "../types";

// Mock the Printful module
vi.mock("../printful", () => ({
  getProductVariants: vi.fn(),
}));

// Mock product data
vi.mock("@/lib/data/products", () => ({
  PRODUCTS: {
    "metatrons-cube-stickers": {
      id: "metatrons-cube-stickers",
      printfulSyncProductId: "6967f3c5902d16",
    },
    "flower-of-life-stickers": {
      id: "flower-of-life-stickers",
      printfulSyncProductId: "6967f23d7e21a7",
    },
  },
}));

const mockGetProductVariants = printful.getProductVariants as Mock;

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
 * Creates a mock cart item
 */
function createMockCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    productId: "metatrons-cube-stickers",
    printfulVariantId: 12345,
    quantity: 1,
    name: "Metatron's Cube Stickers",
    variantName: '3"×3"',
    price: 5.99,
    image: "https://example.com/image.png",
    ...overrides,
  };
}

describe("validateCartItems", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("valid cart scenarios", () => {
    it("returns success with all items validated when prices are correct", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItem = createMockCartItem({ price: 5.99 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.validatedItems).toHaveLength(1);
      expect(result.validatedItems[0]?.validatedPrice).toBe(5.99);
      expect(result.validatedItems[0]?.priceWasAdjusted).toBe(false);
      expect(result.pricesAdjusted).toBe(false);
    });

    it("returns success with priceWasAdjusted when client price differs from Printful", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);

      // Client sends tampered price of $0.01
      const cartItem = createMockCartItem({ price: 0.01 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.validatedItems).toHaveLength(1);
      expect(result.validatedItems[0]?.validatedPrice).toBe(5.99); // Printful price
      expect(result.validatedItems[0]?.priceWasAdjusted).toBe(true);
      expect(result.validatedItems[0]?.originalClientPrice).toBe(0.01);
      expect(result.pricesAdjusted).toBe(true);
    });

    it("validates multiple items from the same product with single API call", async () => {
      const variants = [
        createMockVariant({ id: 12345, price: 5.99, size: '3"×3"' }),
        createMockVariant({ id: 12346, price: 6.99, size: '4"×4"' }),
      ];
      mockGetProductVariants.mockResolvedValue(variants);

      const cartItems = [
        createMockCartItem({ printfulVariantId: 12345, price: 5.99 }),
        createMockCartItem({ printfulVariantId: 12346, price: 6.99, variantName: '4"×4"' }),
      ];
      const result = await validateCartItems(cartItems);

      expect(result.success).toBe(true);
      expect(result.validatedItems).toHaveLength(2);
      // Should only call Printful API once for the same product
      expect(mockGetProductVariants).toHaveBeenCalledTimes(1);
    });

    it("validates items from different products with separate API calls", async () => {
      const metatronsVariants = [createMockVariant({ id: 12345, price: 5.99 })];
      const flowerVariants = [createMockVariant({ id: 22345, price: 4.99 })];

      mockGetProductVariants
        .mockResolvedValueOnce(metatronsVariants)
        .mockResolvedValueOnce(flowerVariants);

      const cartItems = [
        createMockCartItem({
          productId: "metatrons-cube-stickers",
          printfulVariantId: 12345,
          price: 5.99,
        }),
        createMockCartItem({
          productId: "flower-of-life-stickers",
          printfulVariantId: 22345,
          price: 4.99,
        }),
      ];
      const result = await validateCartItems(cartItems);

      expect(result.success).toBe(true);
      expect(result.validatedItems).toHaveLength(2);
      expect(mockGetProductVariants).toHaveBeenCalledTimes(2);
    });
  });

  describe("invalid product scenarios", () => {
    it("returns error for invalid product ID", async () => {
      const cartItem = createMockCartItem({ productId: "nonexistent-product" });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("PRODUCT_NOT_FOUND");
      expect(result.errors[0]?.productId).toBe("nonexistent-product");
      expect(result.validatedItems).toHaveLength(0);
    });
  });

  describe("invalid variant scenarios", () => {
    it("returns error for invalid variant ID", async () => {
      const variant = createMockVariant({ id: 12345 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItem = createMockCartItem({ printfulVariantId: 99999 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("VARIANT_NOT_FOUND");
      expect(result.errors[0]?.printfulVariantId).toBe(99999);
    });
  });

  describe("out of stock scenarios", () => {
    it("returns error for out of stock variant", async () => {
      const variant = createMockVariant({ id: 12345, inStock: false });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItem = createMockCartItem();
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("OUT_OF_STOCK");
    });
  });

  describe("invalid quantity scenarios", () => {
    it("returns error for zero quantity", async () => {
      const variant = createMockVariant({ id: 12345 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItem = createMockCartItem({ quantity: 0 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("INVALID_QUANTITY");
    });

    it("returns error for negative quantity", async () => {
      const variant = createMockVariant({ id: 12345 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItem = createMockCartItem({ quantity: -1 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("INVALID_QUANTITY");
    });

    it("returns error for decimal quantity", async () => {
      const variant = createMockVariant({ id: 12345 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItem = createMockCartItem({ quantity: 1.5 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("INVALID_QUANTITY");
    });
  });

  describe("mixed valid and invalid items", () => {
    it("returns errors for invalid items and validated items for valid ones", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);

      const cartItems = [
        createMockCartItem({ printfulVariantId: 12345, price: 5.99 }), // valid
        createMockCartItem({ printfulVariantId: 99999, price: 5.99 }), // invalid variant
      ];
      const result = await validateCartItems(cartItems);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("VARIANT_NOT_FOUND");
      expect(result.validatedItems).toHaveLength(1);
      expect(result.validatedItems[0]?.printfulVariantId).toBe(12345);
    });
  });

  describe("Printful API error scenarios", () => {
    it("returns error when Printful API fails", async () => {
      mockGetProductVariants.mockRejectedValue(new Error("Printful API error: 500"));

      const cartItem = createMockCartItem();
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe("PRINTFUL_API_ERROR");
      expect(result.errors[0]?.message).toContain("Unable to verify product");
    });
  });

  describe("edge cases", () => {
    it("handles empty cart", async () => {
      const result = await validateCartItems([]);

      expect(result.success).toBe(true);
      expect(result.validatedItems).toHaveLength(0);
      expect(result.errors).toHaveLength(0);
      expect(result.pricesAdjusted).toBe(false);
    });

    it("handles price difference within floating point tolerance", async () => {
      const variant = createMockVariant({ id: 12345, price: 5.99 });
      mockGetProductVariants.mockResolvedValue([variant]);

      // Price with floating point imprecision
      const cartItem = createMockCartItem({ price: 5.990000000001 });
      const result = await validateCartItems([cartItem]);

      expect(result.success).toBe(true);
      expect(result.validatedItems[0]?.priceWasAdjusted).toBe(false);
    });
  });
});
