/**
 * Checkout API Route
 *
 * Creates a Stripe checkout session from cart items.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/env";
import { createCheckoutSession } from "@/lib/shop/stripe";
import type { CartItem } from "@/lib/shop/types";

const CartItemSchema = z.object({
  productId: z.string(),
  printfulVariantId: z.number(),
  quantity: z.number().min(1),
  name: z.string(),
  variantName: z.string(),
  price: z.number().positive(),
  image: z.string(),
});

const CheckoutRequestSchema = z.object({
  items: z.array(CartItemSchema).min(1),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const { items } = CheckoutRequestSchema.parse(body);

    // Use configured APP_URL for success/cancel URLs (avoids origin header spoofing)
    const session = await createCheckoutSession(items as CartItem[], env.APP_URL);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid cart data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
