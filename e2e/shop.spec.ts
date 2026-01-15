import { test, expect } from "@playwright/test";

/**
 * Shop E2E Tests
 *
 * Tests the shop checkout flow from listing to Stripe redirect boundary.
 * Note: These tests require NEXT_PUBLIC_SHOP_ENABLED=true in the environment.
 */

test.describe("Shop Listing Page", () => {
  test("loads with products", async ({ page }) => {
    await page.goto("/shop");

    // Page should load with Shop heading
    await expect(page.getByRole("heading", { name: "Shop", level: 1 })).toBeVisible();

    // Should show product cards (links to product pages)
    const productLinks = page.locator('a[href^="/shop/"]');
    await expect(productLinks.first()).toBeVisible();

    // At least one product should be visible
    const productCount = await productLinks.count();
    expect(productCount).toBeGreaterThan(0);
  });

  test("displays product information correctly", async ({ page }) => {
    await page.goto("/shop");

    // Should show product names
    const productCards = page.locator('a[href^="/shop/"]');
    const firstCard = productCards.first();

    // Product card should have a name (heading)
    await expect(firstCard.locator("h1, h2, h3, h4, h5, h6").first()).toBeVisible();

    // Should show price information
    await expect(firstCard.getByText(/\$/)).toBeVisible();
  });

  test("navigates to product detail page", async ({ page }) => {
    await page.goto("/shop");

    // Click on the first product
    const productLinks = page.locator('a[href^="/shop/"]');
    const firstLink = productLinks.first();
    const href = await firstLink.getAttribute("href");

    await firstLink.click();

    // Should navigate to product detail page
    await expect(page).toHaveURL(href!);
  });
});

test.describe("Product Detail Page", () => {
  test("displays product information", async ({ page }) => {
    // Navigate to a known product
    await page.goto("/shop/flower-of-life-stickers");

    // Should show product name
    await expect(
      page.getByRole("heading", { name: /flower of life stickers/i })
    ).toBeVisible();

    // Should show price
    await expect(page.getByText(/\$\d+\.\d{2}/)).toBeVisible();

    // Should show description
    await expect(page.getByText(/stickers/i)).toBeVisible();

    // Should have breadcrumb navigation
    await expect(page.getByRole("link", { name: "Shop" })).toBeVisible();
  });

  test("shows variant selector with sizes", async ({ page }) => {
    await page.goto("/shop/flower-of-life-stickers");

    // Should show size selector
    await expect(page.getByText(/size/i)).toBeVisible();

    // Should have variant size buttons
    const sizeButtons = page.locator('button[aria-label*="Select size"]');
    await expect(sizeButtons.first()).toBeVisible();
  });

  test("shows add to cart button", async ({ page }) => {
    await page.goto("/shop/flower-of-life-stickers");

    // Should show Add to Cart button
    const addToCartButton = page.getByRole("button", { name: /add to cart/i });
    await expect(addToCartButton).toBeVisible();
  });

  test("can change variant selection", async ({ page }) => {
    await page.goto("/shop/flower-of-life-stickers");

    // Find size buttons and click on the second one if available
    const sizeButtons = page.locator('button[aria-label*="Select size"]');
    const buttonCount = await sizeButtons.count();

    if (buttonCount > 1) {
      await sizeButtons.nth(1).click();

      // The button should now be selected (aria-pressed=true)
      await expect(sizeButtons.nth(1)).toHaveAttribute("aria-pressed", "true");
    }
  });
});

test.describe("Add to Cart", () => {
  test("adds item to cart and opens cart drawer", async ({ page }) => {
    await page.goto("/shop/flower-of-life-stickers");

    // Click Add to Cart
    const addToCartButton = page.getByRole("button", { name: /add to cart/i });
    await addToCartButton.click();

    // Should show "Added to Cart" confirmation briefly
    await expect(page.getByText(/added to cart/i)).toBeVisible();

    // Cart drawer should open (Sheet component)
    await expect(page.getByRole("dialog")).toBeVisible();

    // Cart should show the item
    await expect(page.getByText(/flower of life stickers/i).last()).toBeVisible();
  });

  test("increments quantity for duplicate items", async ({ page }) => {
    await page.goto("/shop/flower-of-life-stickers");

    // Add item twice
    const addToCartButton = page.getByRole("button", { name: /add to cart/i });

    await addToCartButton.click();
    // Wait for the button to reset
    await expect(page.getByText(/add to cart/i)).toBeVisible();

    await addToCartButton.click();

    // Cart drawer should open
    await expect(page.getByRole("dialog")).toBeVisible();

    // Should show quantity of 2
    await expect(page.getByText("2")).toBeVisible();
  });
});

test.describe("Cart Drawer", () => {
  test.beforeEach(async ({ page }) => {
    // Add an item to cart first
    await page.goto("/shop/flower-of-life-stickers");
    await page.getByRole("button", { name: /add to cart/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("displays cart items with name, variant, and price", async ({ page }) => {
    // Should show product name
    await expect(page.getByText(/flower of life stickers/i).last()).toBeVisible();

    // Should show price
    await expect(page.getByText(/\$\d+\.\d{2}/).first()).toBeVisible();
  });

  test("can update item quantity", async ({ page }) => {
    // Find and click increase quantity button
    const increaseButton = page.getByRole("button", {
      name: /increase quantity/i,
    });
    await increaseButton.click();

    // Should show quantity of 2
    await expect(page.getByText("2")).toBeVisible();
  });

  test("can decrease item quantity", async ({ page }) => {
    // First increase to 2
    const increaseButton = page.getByRole("button", {
      name: /increase quantity/i,
    });
    await increaseButton.click();
    await expect(page.getByText("2")).toBeVisible();

    // Then decrease back to 1
    const decreaseButton = page.getByRole("button", {
      name: /decrease quantity/i,
    });
    await decreaseButton.click();
    await expect(page.getByText("1")).toBeVisible();
  });

  test("can remove item from cart", async ({ page }) => {
    // Find and click remove button
    const removeButton = page.getByRole("button", { name: /remove/i });
    await removeButton.click();

    // Cart should show empty state
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test("shows subtotal", async ({ page }) => {
    // Should show subtotal label
    await expect(page.getByText(/subtotal/i)).toBeVisible();

    // Should show a price
    await expect(page.getByText(/\$\d+\.\d{2}/).last()).toBeVisible();
  });

  test("can close cart drawer", async ({ page }) => {
    // Find and click close button (X button in the sheet)
    const closeButton = page.getByRole("button", { name: /close/i });
    await closeButton.click();

    // Dialog should be closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});

test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Add an item to cart
    await page.goto("/shop/flower-of-life-stickers");
    await page.getByRole("button", { name: /add to cart/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("shows proceed to checkout button", async ({ page }) => {
    const checkoutButton = page.getByRole("button", {
      name: /proceed to checkout/i,
    });
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });

  test("checkout button initiates Stripe redirect", async ({ page }) => {
    // Set up request interception to capture the checkout API call
    let checkoutUrl: string | null = null;

    page.on("response", async (response) => {
      if (response.url().includes("/api/checkout")) {
        const data = await response.json();
        checkoutUrl = data.url;
      }
    });

    // Click checkout button
    const checkoutButton = page.getByRole("button", {
      name: /proceed to checkout/i,
    });
    await checkoutButton.click();

    // Should show processing state
    await expect(page.getByText(/processing/i)).toBeVisible();

    // Wait for the API response (with timeout)
    await page.waitForResponse(
      (response) => response.url().includes("/api/checkout"),
      { timeout: 10000 }
    );

    // The checkout URL should point to Stripe
    expect(checkoutUrl).toBeTruthy();
    expect(checkoutUrl).toContain("checkout.stripe.com");
  });
});

test.describe("Cart Persistence", () => {
  test("persists cart across page navigation", async ({ page }) => {
    // Add item to cart
    await page.goto("/shop/flower-of-life-stickers");
    await page.getByRole("button", { name: /add to cart/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Close the drawer
    await page.getByRole("button", { name: /close/i }).click();

    // Navigate to shop listing
    await page.goto("/shop");

    // Click on cart icon to open drawer
    const cartButton = page.getByRole("button", { name: /cart/i });
    await cartButton.click();

    // Item should still be in cart
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/flower of life stickers/i).last()).toBeVisible();
  });
});

test.describe("Success and Cancel Pages", () => {
  test("success page is accessible", async ({ page }) => {
    await page.goto("/shop/success");

    // Page should load without error
    await expect(page).toHaveURL(/\/shop\/success/);
  });

  test("cancel page is accessible", async ({ page }) => {
    await page.goto("/shop/cancel");

    // Page should load without error
    await expect(page).toHaveURL(/\/shop\/cancel/);
  });
});
