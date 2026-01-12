"use client";

import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/shop/cart-context";
import { EASE_STANDARD } from "@/lib/animation-constants";

export function CartIcon() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-warm-charcoal)] hover:text-[var(--color-gold)]"
      aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
    >
      <ShoppingCart className="h-5 w-5" />

      {/* Item count badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_STANDARD }}
            className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-gold)] text-xs font-medium text-[var(--color-obsidian)]"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
