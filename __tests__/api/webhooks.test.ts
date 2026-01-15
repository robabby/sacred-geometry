import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Stripe Webhook Integration Tests
 *
 * Tests the /api/webhooks/stripe route for webhook signature validation
 * and event handling.
 */

// Store mock implementations so we can control them in tests
const mockConstructEvent = vi.fn();
const mockGetCheckoutSession = vi.fn();

// Mock the stripe utilities
vi.mock("@/lib/shop/stripe", () => ({
  constructWebhookEvent: mockConstructEvent,
  getCheckoutSession: mockGetCheckoutSession,
  stripe: {},
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

// Mock fetch for Printful API
const originalFetch = global.fetch;

describe("Stripe Webhook API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("POST /api/webhooks/stripe", () => {
    it("returns 400 when stripe-signature header is missing", async () => {
      const { POST } = await import("@/app/api/webhooks/stripe/route");

      const request = new Request("http://localhost:3000/api/webhooks/stripe", {
        method: "POST",
        body: JSON.stringify({ type: "checkout.session.completed" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Missing stripe-signature header");
    });

    it("returns 400 for invalid webhook signature", async () => {
      mockConstructEvent.mockImplementation(() => {
        throw new Error("Invalid signature");
      });

      const { POST } = await import("@/app/api/webhooks/stripe/route");

      const request = new Request("http://localhost:3000/api/webhooks/stripe", {
        method: "POST",
        headers: { "stripe-signature": "invalid_signature" },
        body: JSON.stringify({ type: "checkout.session.completed" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid signature");
    });

    it("handles checkout.session.completed event successfully", async () => {
      const mockSession = {
        id: "cs_test_123",
        payment_status: "paid",
        customer_details: { email: "test@example.com" },
        collected_information: {
          shipping_details: {
            name: "Test User",
            address: {
              line1: "123 Test St",
              line2: null,
              city: "Test City",
              state: "CA",
              country: "US",
              postal_code: "12345",
            },
          },
        },
        metadata: {
          cartItems: JSON.stringify([
            { productId: "test", printfulVariantId: 123, quantity: 1 },
          ]),
        },
      };

      mockConstructEvent.mockReturnValue({
        type: "checkout.session.completed",
        data: { object: mockSession },
      });

      mockGetCheckoutSession.mockResolvedValue(mockSession);

      // Mock Printful API response
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ result: { id: 123 } }),
      });

      const { POST } = await import("@/app/api/webhooks/stripe/route");

      const request = new Request("http://localhost:3000/api/webhooks/stripe", {
        method: "POST",
        headers: { "stripe-signature": "valid_signature" },
        body: JSON.stringify({ type: "checkout.session.completed" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);
    });

    it("ignores unpaid checkout sessions", async () => {
      const mockSession = {
        id: "cs_test_123",
        payment_status: "unpaid",
      };

      mockConstructEvent.mockReturnValue({
        type: "checkout.session.completed",
        data: { object: mockSession },
      });

      const { POST } = await import("@/app/api/webhooks/stripe/route");

      const request = new Request("http://localhost:3000/api/webhooks/stripe", {
        method: "POST",
        headers: { "stripe-signature": "valid_signature" },
        body: JSON.stringify({ type: "checkout.session.completed" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);
      // Printful API should not have been called
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("handles unrecognized event types gracefully", async () => {
      mockConstructEvent.mockReturnValue({
        type: "some.other.event",
        data: { object: {} },
      });

      const { POST } = await import("@/app/api/webhooks/stripe/route");

      const request = new Request("http://localhost:3000/api/webhooks/stripe", {
        method: "POST",
        headers: { "stripe-signature": "valid_signature" },
        body: JSON.stringify({ type: "some.other.event" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);
    });

    it("returns 500 when Printful order creation fails", async () => {
      const mockSession = {
        id: "cs_test_123",
        payment_status: "paid",
        customer_details: { email: "test@example.com" },
        collected_information: {
          shipping_details: {
            name: "Test User",
            address: {
              line1: "123 Test St",
              city: "Test City",
              state: "CA",
              country: "US",
              postal_code: "12345",
            },
          },
        },
        metadata: {
          cartItems: JSON.stringify([
            { productId: "test", printfulVariantId: 123, quantity: 1 },
          ]),
        },
      };

      mockConstructEvent.mockReturnValue({
        type: "checkout.session.completed",
        data: { object: mockSession },
      });

      mockGetCheckoutSession.mockResolvedValue(mockSession);

      // Mock Printful API failure
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve("Internal Server Error"),
      });

      const { POST } = await import("@/app/api/webhooks/stripe/route");

      const request = new Request("http://localhost:3000/api/webhooks/stripe", {
        method: "POST",
        headers: { "stripe-signature": "valid_signature" },
        body: JSON.stringify({ type: "checkout.session.completed" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to create order");
    });
  });
});
