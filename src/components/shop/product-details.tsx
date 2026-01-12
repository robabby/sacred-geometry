"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ExternalLink } from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { Badge } from "@/components/ui/badge";
import { VariantSelector } from "@/components/shop/variant-selector";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { formatPrice } from "@/lib/shop/printful";
import type { Product, PrintfulVariant } from "@/lib/shop/types";

interface ProductDetailsProps {
  product: Product;
  variants: PrintfulVariant[];
  geometryLink?: {
    path: string;
    name: string;
  };
}

const categoryLabels: Record<string, string> = {
  apparel: "Apparel",
  drinkware: "Drinkware",
  accessories: "Accessories",
};

export function ProductDetails({ product, variants, geometryLink }: ProductDetailsProps) {
  // Initialize with first in-stock variant, or first variant
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    () => {
      const inStockVariant = variants.find((v) => v.inStock);
      return inStockVariant?.id ?? variants[0]?.id ?? null;
    }
  );

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  // Derive current image from selected variant (no effect needed)
  const currentImage =
    selectedVariant?.image ?? variants[0]?.image ?? "";

  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap={{ initial: "6", md: "8", lg: "12" }}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[var(--color-warm-charcoal)]">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Text className="text-[var(--color-warm-gray)]">No image available</Text>
          </div>
        )}
      </div>

      {/* Product Info */}
      <Flex direction="column" gap="6">
        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="w-fit bg-[var(--color-dark-bronze)] text-[var(--color-gold)]"
        >
          {categoryLabels[product.category] ?? product.category}
        </Badge>

        {/* Name and Tagline */}
        <div>
          <Heading
            size={{ initial: "7", md: "8" }}
            className="mb-2 font-display text-[var(--color-cream)]"
          >
            {product.name}
          </Heading>
          <Text size="5" className="text-[var(--color-gold)]">
            {product.tagline}
          </Text>
        </div>

        {/* Price */}
        <Heading size="7" className="text-[var(--color-cream)]">
          {selectedVariant ? formatPrice(selectedVariant.price) : "—"}
        </Heading>

        {/* Description */}
        <Text className="text-[var(--color-warm-gray)]">{product.description}</Text>

        {/* Variant Selector */}
        <AnimatedCard className="p-6">
          <VariantSelector
            variants={variants}
            selectedVariantId={selectedVariantId}
            onVariantChange={setSelectedVariantId}
          />
        </AnimatedCard>

        {/* Selected Variant Info */}
        {selectedVariant && (
          <Text size="2" className="text-[var(--color-warm-gray)]">
            Selected: {selectedVariant.name}
          </Text>
        )}

        {/* Geometry Link */}
        {geometryLink && (
          <Link
            href={geometryLink.path}
            className="group flex items-center gap-2 text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-bright)]"
          >
            <ExternalLink className="h-4 w-4" />
            <Text size="2">Learn about {geometryLink.name}</Text>
          </Link>
        )}

        {/* Add to Cart */}
        <AddToCartButton product={product} selectedVariant={selectedVariant} />
      </Flex>
    </Grid>
  );
}
