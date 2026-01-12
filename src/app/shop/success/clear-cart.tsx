"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/shop/cart-context";

const CART_STORAGE_KEY = "sacred-geometry-cart";

/**
 * Client component that clears the cart on mount.
 * Used on the success page after successful checkout.
 */
export function ClearCartOnSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear both context state and localStorage directly
    clearCart();
    localStorage.removeItem(CART_STORAGE_KEY);
  }, [clearCart]);

  return null;
}
