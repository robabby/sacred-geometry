/**
 * Product Data
 *
 * Sacred geometry merchandise - marketing data mapped to Printful sync product IDs.
 * Variant pricing and availability come from the Printful API at build time.
 */

import type { Product } from "@/lib/shop/types";

export const PRODUCTS: Record<string, Product> = {
  "metatrons-cube-hoodie": {
    id: "metatrons-cube-hoodie",
    slug: "metatrons-cube-hoodie",
    printfulSyncProductId: "69654883c31743",
    name: "Metatron's Cube Hoodie",
    tagline: "Wear the blueprint of creation",
    description:
      "Premium unisex hoodie featuring Metatron's Cube - the sacred pattern containing all five Platonic solids. Soft, comfortable cotton blend perfect for meditation or everyday wear.",
    category: "apparel",
    geometrySlug: "metatrons-cube",
    images: {
      hero: "", // Populated from Printful API
    },
    featured: true,
    order: 1,
  },

  "metatrons-cube-travel-mug": {
    id: "metatrons-cube-travel-mug",
    slug: "metatrons-cube-travel-mug",
    printfulSyncProductId: "696547f103fc66",
    name: "Metatron's Cube Travel Mug",
    tagline: "Sacred geometry on the go",
    description:
      "Insulated stainless steel travel mug with handle. Features Metatron's Cube design - perfect for your morning ritual or afternoon tea ceremony.",
    category: "drinkware",
    geometrySlug: "metatrons-cube",
    images: {
      hero: "", // Populated from Printful API
    },
    featured: true,
    order: 2,
  },

  "metatrons-cube-mug": {
    id: "metatrons-cube-mug",
    slug: "metatrons-cube-mug",
    printfulSyncProductId: "69653bed0aabc4",
    name: "Metatron's Cube Mug",
    tagline: "Start your day with sacred geometry",
    description:
      "White glossy ceramic mug featuring Metatron's Cube. The perfect vessel for your morning contemplation over coffee or tea.",
    category: "drinkware",
    geometrySlug: "metatrons-cube",
    images: {
      hero: "", // Populated from Printful API
    },
    featured: false,
    order: 3,
  },

  "flower-of-life-deskmat": {
    id: "flower-of-life-deskmat",
    slug: "flower-of-life-deskmat",
    printfulSyncProductId: "6966a40834ac72",
    name: "Flower of Life Desk Mat",
    tagline: "Sacred geometry for your workspace",
    description:
      "Premium desk mat featuring the Flower of Life pattern - the ancient symbol of creation found in temples worldwide. Transform your workspace into a sacred space.",
    category: "accessories",
    geometrySlug: "flower-of-life",
    images: {
      hero: "", // Populated from local images
    },
    localImages: {
      thumbnail: "/images/shop/flower-of-life-deskmat/thumbnail.png",
      variants: {
        '12″×18″': [
          "/images/shop/flower-of-life-deskmat/12x18-front-1.png",
          "/images/shop/flower-of-life-deskmat/12x18-front-2.png",
          "/images/shop/flower-of-life-deskmat/12x18-front-3.png",
          "/images/shop/flower-of-life-deskmat/12x18-front-4.png",
          "/images/shop/flower-of-life-deskmat/12x18-detail-1.png",
          "/images/shop/flower-of-life-deskmat/12x18-detail-2.png",
        ],
        '12″×22″': [
          "/images/shop/flower-of-life-deskmat/12x22-front-1.png",
          "/images/shop/flower-of-life-deskmat/12x22-front-2.png",
          "/images/shop/flower-of-life-deskmat/12x22-front-3.png",
          "/images/shop/flower-of-life-deskmat/12x22-front-4.png",
          "/images/shop/flower-of-life-deskmat/12x22-detail-1.png",
          "/images/shop/flower-of-life-deskmat/12x22-detail-2.png",
        ],
        '16″×32″': [
          "/images/shop/flower-of-life-deskmat/16x32-front-1.png",
          "/images/shop/flower-of-life-deskmat/16x32-front-2.png",
          "/images/shop/flower-of-life-deskmat/16x32-front-3.png",
          "/images/shop/flower-of-life-deskmat/16x32-front-4.png",
          "/images/shop/flower-of-life-deskmat/16x32-detail-1.png",
          "/images/shop/flower-of-life-deskmat/16x32-detail-2.png",
        ],
      },
    },
    edition: "January 2026 Edition",
    featured: true,
    order: 4,
  },

  "flower-of-life-stickers": {
    id: "flower-of-life-stickers",
    slug: "flower-of-life-stickers",
    printfulSyncProductId: "6967f23d7e21a7",
    name: "Flower of Life Stickers",
    tagline: "Sacred geometry for every surface",
    description:
      "High-quality kiss-cut stickers featuring the Flower of Life pattern. Perfect for laptops, water bottles, journals, and anywhere you want to add sacred geometry.",
    category: "accessories",
    geometrySlug: "flower-of-life",
    images: {
      hero: "", // Populated from local images
    },
    localImages: {
      thumbnail: "/images/shop/flower-of-life-stickers/thumbnail.png",
      includeApiImage: true,
      variants: {
        '3″×3″': [
          "/images/shop/flower-of-life-stickers/3x3-front-1.png",
          "/images/shop/flower-of-life-stickers/3x3-front-2.png",
          "/images/shop/flower-of-life-stickers/3x3-front-3.png",
          "/images/shop/flower-of-life-stickers/3x3-front-4.png",
          "/images/shop/flower-of-life-stickers/3x3-front-5.png",
          "/images/shop/flower-of-life-stickers/3x3-lifestyle-1.png",
          "/images/shop/flower-of-life-stickers/3x3-lifestyle-2.png",
          "/images/shop/flower-of-life-stickers/3x3-lifestyle-3.png",
        ],
        '4″×4″': [
          "/images/shop/flower-of-life-stickers/4x4-front-1.png",
          "/images/shop/flower-of-life-stickers/4x4-front-2.png",
          "/images/shop/flower-of-life-stickers/4x4-front-3.png",
          "/images/shop/flower-of-life-stickers/4x4-front-4.png",
          "/images/shop/flower-of-life-stickers/4x4-lifestyle-1.png",
          "/images/shop/flower-of-life-stickers/4x4-lifestyle-2.png",
          "/images/shop/flower-of-life-stickers/4x4-lifestyle-3.png",
        ],
        '5.5″×5.5″': [
          "/images/shop/flower-of-life-stickers/5.5x5.5-front-1.png",
          "/images/shop/flower-of-life-stickers/5.5x5.5-front-2.png",
          "/images/shop/flower-of-life-stickers/5.5x5.5-front-3.png",
          "/images/shop/flower-of-life-stickers/5.5x5.5-front-4.png",
          "/images/shop/flower-of-life-stickers/5.5x5.5-lifestyle-1.png",
          "/images/shop/flower-of-life-stickers/5.5x5.5-lifestyle-2.png",
          "/images/shop/flower-of-life-stickers/5.5x5.5-lifestyle-3.png",
        ],
      },
    },
    featured: false,
    order: 5,
  },
};

/**
 * Get all products sorted by order
 */
export function getProducts(): Product[] {
  return Object.values(PRODUCTS).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Get a product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS[slug];
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.featured);
}

/**
 * Get product URL path
 */
export function getProductPath(product: Product): string {
  return `/shop/${product.slug}`;
}
