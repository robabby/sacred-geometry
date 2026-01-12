"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Text } from "@radix-ui/themes";
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
              <span className="ml-auto text-sm font-normal text-[var(--color-warm-gray)]">
                {itemCount} {itemCount === 1 ? "item" : "items"}
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
              <Text className="text-[var(--color-warm-gray)]">
                Your cart is empty
              </Text>
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
                  <div className="flex flex-1 flex-col gap-1">
                    <Text
                      size="2"
                      weight="medium"
                      className="text-[var(--color-cream)]"
                    >
                      {item.name}
                    </Text>
                    <Text size="1" className="text-[var(--color-warm-gray)]">
                      {item.variantName}
                    </Text>
                    <Text
                      size="2"
                      weight="medium"
                      className="text-[var(--color-gold)]"
                    >
                      {formatPrice(item.price)}
                    </Text>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.printfulVariantId, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded border border-[var(--border-gold)]/50 text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm text-[var(--color-cream)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.printfulVariantId, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded border border-[var(--border-gold)]/50 text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.printfulVariantId)}
                        className="ml-auto flex h-7 w-7 items-center justify-center rounded text-[var(--color-warm-gray)] transition-colors hover:text-red-400"
                        aria-label="Remove item"
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
          <SheetFooter className="border-t border-[var(--border-gold)]/50">
            <div className="flex w-full items-center justify-between">
              <Text size="3" className="text-[var(--color-warm-gray)]">
                Subtotal
              </Text>
              <Text
                size="5"
                weight="bold"
                className="text-[var(--color-cream)]"
              >
                {formatPrice(subtotal)}
              </Text>
            </div>
            <Text size="1" className="text-[var(--color-warm-gray)]">
              Shipping and taxes calculated at checkout
            </Text>
            <Button
              className="mt-4 w-full bg-[var(--color-gold)] text-[var(--color-obsidian)] hover:bg-[var(--color-gold-bright)]"
              disabled
            >
              Checkout Coming Soon
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
