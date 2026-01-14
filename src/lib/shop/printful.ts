/**
 * Printful API Client
 *
 * Fetches product variants and pricing from Printful.
 * Used at build time with ISR for fresh pricing.
 */

import { env } from "@/env";
import type {
  PrintfulSyncProductResponse,
  PrintfulVariant,
  Product,
} from "./types";

const PRINTFUL_API_BASE = "https://api.printful.com";

/**
 * Fetch from Printful API with authentication
 */
async function printfulFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${env.PRINTFUL_API_KEY}`,
    },
    next: {
      revalidate: 3600, // ISR: revalidate every hour
    },
  });

  if (!response.ok) {
    throw new Error(`Printful API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Extract size and color from variant name
 * Format: "Product Name - Color / Size" or "Product Name - Size"
 */
function parseVariantName(name: string): { size: string; color: string } {
  // Split on " - " to get the variant part
  const parts = name.split(" - ");
  const variantPart = parts[parts.length - 1] ?? "";

  // Check if it contains " / " (color/size separator)
  if (variantPart.includes(" / ")) {
    const [color, size] = variantPart.split(" / ");
    return {
      color: color?.trim() ?? "Default",
      size: size?.trim() ?? "One Size",
    };
  }

  // Single value - could be just size or just color
  return {
    color: "Default",
    size: variantPart.trim() || "One Size",
  };
}

/**
 * Get variants for a sync product
 */
export async function getProductVariants(
  syncProductId: string
): Promise<PrintfulVariant[]> {
  const data = await printfulFetch<PrintfulSyncProductResponse>(
    `/store/products/@${syncProductId}`
  );

  return data.result.sync_variants.map((variant) => {
    const { size, color } = parseVariantName(variant.name);

    // Get preview image from files
    const previewFile = variant.files.find((f) => f.type === "preview");

    return {
      id: variant.id,
      name: variant.name,
      size,
      color,
      colorCode: "", // Printful doesn't provide hex codes in sync variant response
      price: parseFloat(variant.retail_price),
      inStock: variant.availability_status === "active",
      image: previewFile?.preview_url ?? variant.product.image,
    };
  });
}

/**
 * Get product thumbnail URL from Printful
 */
export async function getProductThumbnail(syncProductId: string): Promise<string> {
  const data = await printfulFetch<PrintfulSyncProductResponse>(
    `/store/products/@${syncProductId}`
  );

  // Use thumbnail from sync product
  return data.result.sync_product.thumbnail_url;
}

/**
 * Get product with variants hydrated from Printful
 * Uses local images as fallback when available
 */
export async function getProductWithVariants(product: Product): Promise<{
  product: Product;
  variants: PrintfulVariant[];
  thumbnail: string;
}> {
  const [variants, apiThumbnail] = await Promise.all([
    getProductVariants(product.printfulSyncProductId),
    getProductThumbnail(product.printfulSyncProductId),
  ]);

  // Use local thumbnail if available, otherwise use API thumbnail
  const thumbnail = product.localImages?.thumbnail ?? apiThumbnail;

  // Apply local variant images if available (first image in array is primary)
  const variantsWithLocalImages = variants.map((variant) => {
    if (product.localImages?.variants) {
      const localImages = product.localImages.variants[variant.size];
      if (localImages && localImages.length > 0) {
        return { ...variant, image: localImages[0] };
      }
    }
    return variant;
  });

  return {
    product: {
      ...product,
      images: {
        ...product.images,
        hero: thumbnail,
      },
    },
    variants: variantsWithLocalImages,
    thumbnail,
  };
}

/**
 * Get price range for a product
 */
export function getPriceRange(variants: PrintfulVariant[]): {
  min: number;
  max: number;
} {
  if (variants.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = variants.map((v) => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
