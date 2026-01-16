/**
 * Stripe Utilities
 *
 * Server-side Stripe client and checkout session creation.
 */

import Stripe from "stripe";
import { env } from "@/env";
import type { ValidatedCartItem } from "./types";

/**
 * Server-side Stripe client
 */
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

/**
 * Create a Stripe checkout session from validated cart items
 *
 * Uses `validatedPrice` from Printful (not client-provided price) to prevent
 * price tampering attacks.
 */
export async function createCheckoutSession(
  items: ValidatedCartItem[],
  origin: string
): Promise<Stripe.Checkout.Session> {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.variantName,
          images: item.image
            ? [item.image.startsWith("http") ? item.image : `${origin}${item.image}`]
            : undefined,
          metadata: {
            productId: item.productId,
            printfulVariantId: item.printfulVariantId.toString(),
          },
        },
        unit_amount: Math.round(item.validatedPrice * 100), // Use validated price (Stripe expects cents)
      },
      quantity: item.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop/cancel`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "ES", "IT", "NL"],
    },
    metadata: {
      cartItems: JSON.stringify(
        items.map((item) => ({
          productId: item.productId,
          printfulVariantId: item.printfulVariantId,
          quantity: item.quantity,
        }))
      ),
    },
  });

  return session;
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details", "collected_information"],
  });
}

/**
 * Verify Stripe webhook signature
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );
}
