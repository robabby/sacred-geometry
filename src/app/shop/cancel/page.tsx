/**
 * Checkout Cancelled Page
 *
 * Shown when user cancels checkout.
 */

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Heading, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        {/* Cancel Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-warm-gray)]/20">
          <XCircle className="h-10 w-10 text-[var(--color-warm-gray)]" />
        </div>

        {/* Heading */}
        <Heading
          as="h1"
          size="7"
          className="font-heading text-[var(--color-cream)]"
        >
          Checkout Cancelled
        </Heading>

        <Text size="4" className="text-[var(--color-warm-gray)]">
          Your checkout was cancelled. Don&apos;t worry - your cart items are
          still saved and you can complete your purchase anytime.
        </Text>

        {/* Actions */}
        <div className="mt-4 flex gap-4">
          <Link href="/shop">
            <Button className="bg-[var(--color-gold)] text-[var(--color-obsidian)] hover:bg-[var(--color-gold-bright)]">
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
