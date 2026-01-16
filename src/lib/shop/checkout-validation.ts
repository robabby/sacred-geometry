/**
 * Checkout Validation
 *
 * Server-side validation of cart items against Printful's authoritative data.
 * Prevents price tampering attacks by never trusting client-provided prices.
 */

import { PRODUCTS } from "@/lib/data/products";
import { getProductVariants } from "./printful";
import type {
  CartItem,
  CartItemError,
  PrintfulVariant,
  ValidatedCartItem,
  ValidationErrorCode,
  ValidationResult,
} from "./types";

/**
 * Floating point tolerance for price comparison (1 cent)
 */
const PRICE_TOLERANCE = 0.01;

/**
 * Check if two prices are equal within floating point tolerance
 */
function pricesAreEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < PRICE_TOLERANCE;
}

/**
 * Validate a single cart item against Printful variant data
 */
function validateItem(
  item: CartItem,
  index: number,
  variants: PrintfulVariant[]
): { validated?: ValidatedCartItem; error?: CartItemError } {
  // Validate quantity
  if (
    item.quantity <= 0 ||
    !Number.isInteger(item.quantity)
  ) {
    return {
      error: {
        index,
        productId: item.productId,
        printfulVariantId: item.printfulVariantId,
        code: "INVALID_QUANTITY",
        message: `Invalid quantity: ${item.quantity}`,
      },
    };
  }

  // Find the variant in Printful data
  const variant = variants.find((v) => v.id === item.printfulVariantId);

  if (!variant) {
    return {
      error: {
        index,
        productId: item.productId,
        printfulVariantId: item.printfulVariantId,
        code: "VARIANT_NOT_FOUND",
        message: `Variant ${item.printfulVariantId} not found for product ${item.productId}`,
      },
    };
  }

  // Check stock status
  if (!variant.inStock) {
    return {
      error: {
        index,
        productId: item.productId,
        printfulVariantId: item.printfulVariantId,
        code: "OUT_OF_STOCK",
        message: `${item.name} (${item.variantName}) is out of stock`,
      },
    };
  }

  // Validate and use authoritative price
  const priceWasAdjusted = !pricesAreEqual(item.price, variant.price);

  return {
    validated: {
      ...item,
      validatedPrice: variant.price,
      priceWasAdjusted,
      originalClientPrice: item.price,
    },
  };
}

/**
 * Validate cart items against Printful's authoritative pricing data.
 *
 * Groups items by product to minimize API calls, then validates each item's
 * price, stock status, and existence against Printful data.
 *
 * @param items - Cart items from client (untrusted prices)
 * @returns Validation result with validated items or errors
 */
export async function validateCartItems(
  items: CartItem[]
): Promise<ValidationResult> {
  if (items.length === 0) {
    return {
      success: true,
      validatedItems: [],
      errors: [],
      pricesAdjusted: false,
    };
  }

  const validatedItems: ValidatedCartItem[] = [];
  const errors: CartItemError[] = [];

  // Group items by productId to minimize Printful API calls
  const itemsByProduct = new Map<string, { item: CartItem; index: number }[]>();
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    const existing = itemsByProduct.get(item.productId) ?? [];
    existing.push({ item, index: i });
    itemsByProduct.set(item.productId, existing);
  }

  // Process each product group
  for (const [productId, productItems] of itemsByProduct) {
    // Look up product to get Printful sync product ID
    const product = PRODUCTS[productId];

    if (!product) {
      // Product not found - add errors for all items with this productId
      for (const { item, index } of productItems) {
        errors.push({
          index,
          productId: item.productId,
          printfulVariantId: item.printfulVariantId,
          code: "PRODUCT_NOT_FOUND" as ValidationErrorCode,
          message: `Product ${item.productId} not found`,
        });
      }
      continue;
    }

    // Fetch variants from Printful
    let variants: PrintfulVariant[];
    try {
      variants = await getProductVariants(product.printfulSyncProductId);
    } catch (error) {
      // Printful API error - add errors for all items with this productId
      for (const { item, index } of productItems) {
        errors.push({
          index,
          productId: item.productId,
          printfulVariantId: item.printfulVariantId,
          code: "PRINTFUL_API_ERROR" as ValidationErrorCode,
          message: `Unable to verify product: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
      continue;
    }

    // Validate each item in this product group
    for (const { item, index } of productItems) {
      const result = validateItem(item, index, variants);

      if (result.error) {
        errors.push(result.error);
      } else if (result.validated) {
        validatedItems.push(result.validated);
      }
    }
  }

  const pricesAdjusted = validatedItems.some((item) => item.priceWasAdjusted);

  return {
    success: errors.length === 0,
    validatedItems,
    errors,
    pricesAdjusted,
  };
}
