import { test, expect } from '../../fixtures/test';
import products from '../../data/products.json';
import checkoutData from '../../data/checkout.json';

test('TC-AUTO-005 @prod-safe - Adding a product updates the cart badge', async ({ authenticatedShopper }) => {
  await authenticatedShopper.addToCart('sauce-labs-backpack');
  await authenticatedShopper.expectCartCount(1);
  await expect(authenticatedShopper.items.filter({ hasText: products.backpack.name }).getByRole('button', { name: 'Remove' }))
    .toBeVisible();
});

test('TC-AUTO-006 @prod-safe - A product can be removed from the cart', async ({ authenticatedShopper, cartPage }) => {
  await authenticatedShopper.addToCart('sauce-labs-backpack');
  await authenticatedShopper.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductVisible(products.backpack.name);

  await cartPage.removeProduct('sauce-labs-backpack');
  await cartPage.expectProductAbsent(products.backpack.name);
  await authenticatedShopper.expectCartCount(0);
});

test('TC-AUTO-007 @production-unsafe - Shopper completes checkout for a cart prepared by a fixture', async ({ checkoutReadyShopper, page }) => {
  // Dependency is modeled explicitly: checkoutReadyShopper first authenticates and creates cart state.
  await checkoutReadyShopper.cart.checkoutButton.click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
  await checkoutReadyShopper.checkout.fillCustomerDetails(checkoutData.validCustomer);
  await checkoutReadyShopper.checkout.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.locator('.cart_item')).toContainText(products.backpack.name);
  await expect(page.locator('.summary_subtotal_label')).toContainText('Item total: $29.99');

  await checkoutReadyShopper.checkout.finishOrder();
  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(checkoutReadyShopper.checkout.completeHeading).toBeVisible();
});

test('TC-AUTO-014 @prod-safe - Cart shows the correct contents when multiple products are added', async ({ authenticatedShopper, cartPage }) => {
  await authenticatedShopper.addToCart('allaballa');
  await authenticatedShopper.addToCart('sauce-labs-bike-light');
  await authenticatedShopper.expectCartCount(2);

  await authenticatedShopper.openCart();
  await cartPage.expectLoaded();
  await expect(cartPage.items, 'Cart should contain exactly two products').toHaveCount(2);
  await cartPage.expectProductVisible(products.backpack.name);
  await cartPage.expectProductVisible(products.bikeLight.name);
});

test('TC-AUTO-015 @prod-safe - Checkout blocks continuation when postal code is missing', async ({ checkoutReadyShopper, page }) => {
  await checkoutReadyShopper.cart.checkoutButton.click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);

  await checkoutReadyShopper.checkout.fillCustomerDetails(checkoutData.missingPostalCode);
  await checkoutReadyShopper.checkout.continueToOverview();

  await checkoutReadyShopper.checkout.expectCheckoutError('Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
});
