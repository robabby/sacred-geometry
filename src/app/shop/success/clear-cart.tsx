"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/shop/cart-context";

/**
 * Client component that clears the cart on mount.
 * Used on the success page after successful checkout.
 */
export function ClearCartOnSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
