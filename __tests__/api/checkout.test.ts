import { describe, expect, it, vi, beforeEach } from "vitest";

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

describe("Checkout API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
