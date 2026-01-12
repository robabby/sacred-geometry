/**
 * Stripe Webhook Handler
 *
 * Handles Stripe events, particularly checkout.session.completed
 * to create Printful orders.
 */

import { NextResponse } from "next/server";
import { constructWebhookEvent, getCheckoutSession } from "@/lib/shop/stripe";
import { env } from "@/env";
import type Stripe from "stripe";

/**
 * Create a Printful order from checkout session data
 */
async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;
  const customerEmail = session.customer_details?.email;
  const cartItemsJson = session.metadata?.cartItems;

  if (!shipping?.address || !customerEmail || !cartItemsJson) {
    throw new Error("Missing required order data");
  }

  const cartItems = JSON.parse(cartItemsJson) as Array<{
    productId: string;
    printfulVariantId: number;
    quantity: number;
  }>;

  // Create Printful order
  const printfulResponse = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PRINTFUL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: {
        name: shipping.name,
        email: customerEmail,
        address1: shipping.address.line1,
        address2: shipping.address.line2 ?? undefined,
        city: shipping.address.city,
        state_code: shipping.address.state,
        country_code: shipping.address.country,
        zip: shipping.address.postal_code,
      },
      items: cartItems.map((item) => ({
        sync_variant_id: item.printfulVariantId,
        quantity: item.quantity,
      })),
      // Printful external_id max 32 chars - use last 32 chars of session ID
      external_id: session.id.slice(-32),
    }),
  });

  if (!printfulResponse.ok) {
    const errorText = await printfulResponse.text();
    throw new Error(`Printful API error: ${printfulResponse.status} ${errorText}`);
  }

  return printfulResponse.json();
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Only process paid sessions
      if (session.payment_status === "paid") {
        try {
          // Get full session with expanded data
          const fullSession = await getCheckoutSession(session.id);
          await createPrintfulOrder(fullSession);
          console.log(`Printful order created for session ${session.id}`);
        } catch (error) {
          console.error("Failed to create Printful order:", error);
          // Return error so Stripe will retry the webhook
          return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
          );
        }
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
