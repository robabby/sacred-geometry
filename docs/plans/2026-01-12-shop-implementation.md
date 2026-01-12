# Shop Page Implementation Plan

> **Linear Issues**: [SG-197](https://linear.app/sherpagg/issue/SG-197) (parent), SG-198 through SG-203 (phases)
> **Created**: 2026-01-12
> **Status**: Phase 2 complete, Phase 3 (Feature Flags) next
> **PRs**: [#85](https://github.com/robabby/sacred-geometry/pull/85) (Phase 1), [#86](https://github.com/robabby/sacred-geometry/pull/86) (Phase 2)

## Summary

Implement a proof-of-concept shop for sacred geometry merchandise using Printful (print-on-demand) + Stripe (payments). The goal is to validate demand with minimal infrastructure.

### Key Decisions

- **Platform**: Printful API for fulfillment
- **Payments**: Stripe Checkout (hosted, transaction-based pricing)
- **Products**: 3 items featuring Metatron's Cube (hoodie, travel mug, glossy mug)
- **Cart**: Drawer-style with localStorage persistence (supports future `/cart` page)
- **Product data**: TypeScript files mapping to Printful IDs (matches geometry pattern)
- **Content linking**: One-way (products → geometries, not vice versa)

### Printful Products

| Product | Sync ID | Variants |
|---------|---------|----------|
| Unisex Hoodie | `69654883c31743` | 6 |
| Travel mug with a handle | `696547f103fc66` | 2 |
| White Metatron's Cube glossy mug | `69653bed0aabc4` | 3 |

### Important Dates

- **Printful API key expires**: Dec 31, 2026

---

## Architecture

### URL Structure

```
/shop                    → Product listing page
/shop/[slug]             → Product detail page
/api/checkout            → Creates Stripe checkout session
/api/webhooks/stripe     → Handles payment success, creates Printful order
```

### Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Your TS Data   │     │  Printful API   │     │     Stripe      │
│  (marketing)    │ ──► │  (variants,     │ ──► │  (payment)      │
│                 │     │   pricing)      │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         └──────────────────────┴───────────────────────┘
                               │
                        ┌──────▼──────┐
                        │   Next.js   │
                        │   Frontend  │
                        └─────────────┘
```

---

## Environment Variables

### `.env.local` (create new file)

```bash
# Feature Flags
NEXT_PUBLIC_SHOP_ENABLED=true  # Set to "false" in production until ready

# Printful
PRINTFUL_API_KEY=<your-key>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Update `src/env.js`

Add validation for new environment variables using existing Zod pattern.

---

## New Files & Structure

```
src/
├── lib/
│   ├── data/
│   │   └── products.ts              # Product definitions
│   └── shop/
│       ├── types.ts                 # Shop-related types
│       ├── printful.ts              # Printful API client
│       ├── cart-context.tsx         # Cart state + localStorage
│       ├── feature-flags.ts         # Shop feature flag utilities
│       └── stripe.ts                # Stripe utilities
├── components/
│   └── shop/
│       ├── product-card.tsx         # Grid card component
│       ├── variant-selector.tsx     # Size/color picker
│       ├── cart-drawer.tsx          # Slide-out cart
│       ├── cart-icon.tsx            # Header icon with badge
│       └── add-to-cart-button.tsx   # Add to cart CTA
├── app/
│   ├── shop/
│   │   ├── page.tsx                 # Product listing
│   │   └── [slug]/
│   │       └── page.tsx             # Product detail
│   └── api/
│       ├── checkout/
│       │   └── route.ts             # Create Stripe session
│       └── webhooks/
│           └── stripe/
│               └── route.ts         # Handle payment webhooks
```

---

## Data Models

### Product (`src/lib/data/products.ts`)

```typescript
export interface Product {
  id: string;
  slug: string;
  printfulSyncProductId: string;
  name: string;
  tagline: string;
  description: string;
  category: "apparel" | "drinkware" | "accessories";
  geometrySlug?: string;
  images: {
    hero: string;
    gallery?: string[];
  };
  featured?: boolean;
  order?: number;
}
```

### Cart Item (`src/lib/shop/types.ts`)

```typescript
export interface CartItem {
  productId: string;
  printfulVariantId: number;
  quantity: number;
  name: string;
  variantName: string;
  price: number;
  image: string;
}
```

### Printful Variant (from API)

```typescript
export interface PrintfulVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  colorCode: string;
  price: number;
  inStock: boolean;
}
```

---

## Implementation Phases

### Phase 1: Foundation ([SG-198](https://linear.app/sherpagg/issue/SG-198)) ✅ COMPLETE

**Goal**: Display products with real Printful data

- [x] Create `src/lib/data/products.ts` with 3 products
- [x] Create `src/lib/shop/types.ts` with TypeScript interfaces
- [x] Create `src/lib/shop/printful.ts` - API client for fetching variants/pricing
- [x] Update `src/env.js` with Printful env var
- [x] Create `/shop` listing page with product grid
- [x] Create `/shop/[slug]` detail page with variant display
- [x] Create `ProductCard` and `VariantSelector` components
- [x] Add `createProductSchema` for SEO structured data
- [x] Configure Next.js image domains for Printful CDN

**Verification**: Browse `/shop`, click into a product, see live pricing from Printful

### Phase 2: Cart ([SG-199](https://linear.app/sherpagg/issue/SG-199)) ✅ COMPLETE

**Goal**: Add to cart functionality with drawer UI

- [x] Create `src/lib/shop/cart-context.tsx` - React context + localStorage
- [x] Create `CartDrawer` component (shadcn Sheet)
- [x] Create `CartIcon` component for header
- [x] Create `AddToCartButton` component
- [x] Update header to include cart icon
- [x] Wire up "Add to Cart" on product detail page

**Verification**: Add items to cart, refresh page (persists), open drawer, see items

### Phase 3: Feature Flags ([SG-203](https://linear.app/sherpagg/issue/SG-203))

**Goal**: Hide shop in production while continuing development

1. Add `NEXT_PUBLIC_SHOP_ENABLED` to `src/env.js` with Zod validation
2. Create `src/lib/shop/feature-flags.ts` utility for checking flag
3. Update header to conditionally show/hide Shop nav link
4. Update `src/app/layout.tsx` to conditionally wrap with CartProvider
5. Create `/shop` "Coming Soon" page when disabled
6. Update `/shop/[slug]` to show "Coming Soon" when disabled
7. Add `NEXT_PUBLIC_SHOP_ENABLED=true` to `.env.local`
8. Document Vercel env var setup (default `false` for production)

**Behavior when disabled:**
- Shop link hidden from navigation
- CartProvider not rendered (no cart state/localStorage)
- Direct navigation to `/shop` or `/shop/[slug]` shows "Coming Soon" page
- Development continues unimpeded with `NEXT_PUBLIC_SHOP_ENABLED=true` locally

**Verification**: Set flag to `false`, verify nav link hidden, verify /shop shows Coming Soon

### Phase 4: Checkout ([SG-200](https://linear.app/sherpagg/issue/SG-200))

**Goal**: Complete purchase flow

1. Create Stripe account (test mode) and get API keys
2. Create `/api/checkout/route.ts` - creates Stripe session with cart items
3. Create `/api/webhooks/stripe/route.ts` - handles successful payment
4. Implement Printful order creation in webhook
5. Create success/cancel pages
6. Add "Checkout" button to cart drawer

**Verification**: Add item, checkout, use Stripe test card, verify order appears in Printful dashboard

### Phase 5: Polish ([SG-201](https://linear.app/sherpagg/issue/SG-201))

**Goal**: Production-ready experience

1. Add loading states (skeletons for product grid, spinner for add to cart)
2. Add error handling (API failures, out of stock)
3. Add SEO metadata (`generateMetadata` for shop pages)
4. Mobile responsiveness pass
5. Configure Printful order confirmation emails

**Verification**: Full flow on mobile, test error scenarios, check SEO tags

---

## Files to Modify

| File | Change |
|------|--------|
| `src/env.js` | Add shop environment variables |
| `src/components/header.tsx` | Add cart icon |
| `src/util/routes.ts` | Add `/shop` route |
| `src/app/layout.tsx` | Wrap with CartProvider |

---

## Out of Scope (Future Iterations)

- User accounts / order history
- Dedicated `/cart` page (drawer only for POC)
- Discount codes
- Inventory tracking UI
- Multiple shipping options
- Order tracking page

---

## Verification Checklist

### Local Development

- [x] `pnpm dev` runs without errors (Phase 1)
- [x] `/shop` displays 3 products with Printful pricing (Phase 1)
- [x] `/shop/[slug]` shows variants, updates price on selection (Phase 1)
- [x] Add to cart works, persists on refresh (Phase 2)
- [x] Cart drawer opens/closes, shows correct items (Phase 2)
- [ ] Shop hidden when `NEXT_PUBLIC_SHOP_ENABLED=false` (Phase 3)
- [ ] "Coming Soon" page shows on direct /shop navigation when disabled (Phase 3)
- [ ] Checkout redirects to Stripe (Phase 4)
- [ ] Test payment (4242 4242 4242 4242) succeeds (Phase 4)
- [ ] Order appears in Printful dashboard (test mode) (Phase 4)

### Before Production Deploy

- [ ] Set `NEXT_PUBLIC_SHOP_ENABLED=false` in Vercel (keeps shop hidden until ready)
- [ ] Switch Stripe to live keys
- [ ] Set up Stripe webhook endpoint for production URL
- [ ] Add all env vars to Vercel
- [ ] Test one real order (can cancel in Printful before fulfillment)
- [ ] When ready: Set `NEXT_PUBLIC_SHOP_ENABLED=true` to launch shop

---

## Dependencies to Add

```bash
pnpm add stripe @stripe/stripe-js
```

No Printful SDK needed - we'll use fetch with the REST API directly.
