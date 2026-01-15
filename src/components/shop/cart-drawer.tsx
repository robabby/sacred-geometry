"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/shop/cart-context";
import { formatPrice } from "@/lib/shop/printful";

export function CartDrawer() {
  const {
    items,
    isOpen,
    itemCount,
    subtotal,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Checkout failed"
      );
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-[var(--border-gold)] bg-[var(--color-obsidian)] sm:max-w-md"
      >
        <SheetHeader className="border-b border-[var(--border-gold)]/50">
          <SheetTitle className="flex items-center gap-2 font-heading text-[var(--color-cream)]">
            <ShoppingBag className="h-5 w-5 text-[var(--color-gold)]" />
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-[var(--color-warm-gray)]">
                ({itemCount})
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review and manage items in your shopping cart
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <ShoppingBag className="h-16 w-16 text-[var(--color-warm-gray)]/50" />
              <span className="text-base text-[var(--color-warm-gray)]">
                Your cart is empty
              </span>
              <Link href="/shop" onClick={closeCart}>
                <Button
                  variant="outline"
                  className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border-gold)]/30">
              {items.map((item) => (
                <li
                  key={item.printfulVariantId}
                  className="flex gap-4 p-4"
                >
                  {/* Product Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-warm-charcoal)]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-[var(--color-warm-gray)]/50" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <span className="font-heading text-lg font-medium text-[var(--color-cream)]">
                      {item.name}
                    </span>
                    <span className="text-sm text-[var(--color-warm-gray)]">
                      {item.variantName}
                    </span>
                    <span className="text-lg font-semibold text-[var(--color-gold)]">
                      {formatPrice(item.price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.printfulVariantId, item.quantity - 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-gold)]/50 text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-base text-[var(--color-cream)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.printfulVariantId, item.quantity + 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-gold)]/50 text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.printfulVariantId)}
                        className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-warm-gray)] transition-colors hover:text-red-400"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with Subtotal */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-[var(--border-gold)]/50 pb-safe">
            <div className="flex w-full items-center justify-between">
              <span className="text-base text-[var(--color-warm-gray)]">
                Subtotal
              </span>
              <span className="text-xl font-bold text-[var(--color-cream)]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <span className="text-sm text-[var(--color-warm-gray)]">
              Shipping and taxes calculated at checkout
            </span>
            {checkoutError && (
              <div className="flex items-center gap-2 rounded-md border border-red-400/50 bg-red-400/10 px-3 py-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                <span className="text-sm text-red-400">
                  {checkoutError}
                </span>
              </div>
            )}
            <Button
              className="mt-4 w-full bg-[var(--color-gold)] text-[var(--color-obsidian)] hover:bg-[var(--color-gold-bright)]"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
