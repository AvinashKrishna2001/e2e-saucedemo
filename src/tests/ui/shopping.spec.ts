import { type Page } from '@playwright/test';
import { test, expect } from '../../fixtures/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import users from '../../data/users.json';
import products from '../../data/products.json';
import checkoutData from '../../data/checkout.json';

// Dependent tests: they run in this order and share one browser session.
// Each test continues from the state left by the previous one, so running a later
// test on its own fails (no login, empty cart). Chain:
//   005 login + add backpack -> 014 add bike light -> 006 remove backpack
//   -> 015 checkout validation -> 007 complete checkout
test.describe.serial('Shopping journey (dependent tests)', () => {
  let page: Page;
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeAll(async ({ browser }, testInfo) => {
    page = await browser.newPage({ baseURL: testInfo.project.use.baseURL });
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('TC-AUTO-005 @prod-safe - Adding a product updates the cart badge', async () => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard);
    await inventory.expectLoaded();

    await inventory.addToCart('sauce-labs-backpack');
    await inventory.expectCartCount(1);
    await expect(inventory.items.filter({ hasText: products.backpack.name }).getByRole('button', { name: 'Remove' }))
      .toBeVisible();
  });

  test('TC-AUTO-014 @prod-safe - Cart shows the correct contents when multiple products are added (depends on TC-AUTO-005)', async () => {
    // Backpack is already in the cart from TC-AUTO-005.
    await inventory.addToCart('sauce-labs-bike-light');
    await inventory.expectCartCount(2);

    await inventory.openCart();
    await cart.expectLoaded();
    await expect(cart.items, 'Cart should contain exactly two products').toHaveCount(2);
    await cart.expectProductVisible(products.backpack.name);
    await cart.expectProductVisible(products.bikeLight.name);
  });

  test('TC-AUTO-006 @prod-safe - A product can be removed from the cart (depends on TC-AUTO-014)', async () => {
    // Already on the cart page with two products from TC-AUTO-014.
    await cart.removeProduct('sauce-labs-backpack');
    await cart.expectProductAbsent(products.backpack.name);
    await cart.expectProductVisible(products.bikeLight.name);
    await inventory.expectCartCount(1);
  });

  test('TC-AUTO-015 @prod-safe - Checkout blocks continuation when postal code is missing (depends on TC-AUTO-006)', async () => {
    await cart.checkoutButton.click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    await checkout.fillCustomerDetails(checkoutData.missingPostalCode);
    await checkout.continueToOverview();

    await checkout.expectCheckoutError('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });

  test('TC-AUTO-007 @production-unsafe - Shopper completes checkout (depends on TC-AUTO-015)', async () => {
    // Still on checkout step one with the bike light in the cart.
    await checkout.fillCustomerDetails(checkoutData.validCustomer);
    await checkout.continueToOverview();

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.locator('.cart_item')).toContainText(products.bikeLight.name);
    await expect(page.locator('.summary_subtotal_label')).toContainText(`Item total: ${products.bikeLight.price}`);

    await checkout.finishOrder();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(checkout.completeHeading).toBeVisible();
  });
});
