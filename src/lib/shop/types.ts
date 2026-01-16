/**
 * Shop Type Definitions
 *
 * Core TypeScript interfaces for the shop data model
 */

import type { GeometryId } from "@/lib/data/geometries.types";

/**
 * Product category types
 */
export type ProductCategory = "apparel" | "drinkware" | "accessories";

/**
 * Product definition (marketing data in TypeScript)
 */
export interface Product {
  id: string;
  slug: string;
  printfulSyncProductId: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  geometrySlug?: GeometryId;
  images: {
    hero: string;
    gallery?: string[];
  };
  /** Local images for products where Printful mockups aren't available */
  localImages?: {
    thumbnail: string;
    /** Maps size to array of image paths (first is primary, rest are gallery) */
    variants?: Record<string, string[]>;
    /** When true, keeps Printful API image as primary and appends local images to gallery */
    includeApiImage?: boolean;
  };
  /** Edition label for limited/monthly releases (e.g., "January 2026 Edition") */
  edition?: string;
  featured?: boolean;
  order?: number;
}

/**
 * Printful variant (from API response)
 */
export interface PrintfulVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  colorCode: string;
  price: number;
  inStock: boolean;
  image?: string;
}

/**
 * Cart item for localStorage persistence
 */
export interface CartItem {
  productId: string;
  printfulVariantId: number;
  quantity: number;
  name: string;
  variantName: string;
  price: number;
  image: string;
}

/**
 * Printful API response types
 */
export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
}

export interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    hash: string;
    url: string | null;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number | null;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
    is_temporary: boolean;
  }>;
  options: Array<{
    id: string;
    value: string;
  }>;
  main_category_id: number;
  availability_status: string;
}

export interface PrintfulSyncProductResponse {
  code: number;
  result: {
    sync_product: PrintfulSyncProduct;
    sync_variants: PrintfulSyncVariant[];
  };
}

/**
 * Validation Error Codes
 */
export type ValidationErrorCode =
  | "PRODUCT_NOT_FOUND"
  | "VARIANT_NOT_FOUND"
  | "OUT_OF_STOCK"
  | "INVALID_QUANTITY"
  | "PRINTFUL_API_ERROR";

/**
 * Cart item validation error
 */
export interface CartItemError {
  index: number;
  productId: string;
  printfulVariantId: number;
  code: ValidationErrorCode;
  message: string;
}

/**
 * Validated cart item with authoritative price from Printful
 */
export interface ValidatedCartItem extends CartItem {
  validatedPrice: number;
  priceWasAdjusted: boolean;
  originalClientPrice: number;
}

/**
 * Result of cart validation
 */
export interface ValidationResult {
  success: boolean;
  validatedItems: ValidatedCartItem[];
  errors: CartItemError[];
  pricesAdjusted: boolean;
}
