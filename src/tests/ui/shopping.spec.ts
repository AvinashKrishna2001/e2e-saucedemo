import { test, expect } from '../../fixtures/test';
import products from '../../data/products.json';
import checkoutData from '../../data/checkout.json';

test('TC-AUTO-005 @prod-safe - Adding a product updates the cart badge', async ({ authenticatedShopper }) => {
  await authenticatedShopper.expectCartCount(0);

  await authenticatedShopper.addToCart('sauce-labs-backpack');

  await authenticatedShopper.expectCartCount(1);
  await expect(
    authenticatedShopper.items
      .filter({ hasText: products.backpack.name })
      .getByRole('button', { name: 'Remove' }),
  ).toBeVisible();
});

test('TC-AUTO-014 @prod-safe - Cart shows the correct contents when multiple products are added', async ({ checkoutReadyShopper }) => {
  const { inventory, cart } = checkoutReadyShopper;

  await cart.continueShoppingButton.click();
  await inventory.addToCart('sauce-labs-bike-light');
  await inventory.expectCartCount(2);
  await inventory.openCart();

  await cart.expectLoaded();
  await expect(cart.items, 'Cart should contain exactly two distinct products').toHaveCount(2);
  await expect(cart.items.locator('.inventory_item_name')).toHaveText([
    products.backpack.name,
    products.bikeLight.name,
  ]);
  await expect(cart.items.filter({ hasText: products.backpack.name }))
    .toContainText(products.backpack.price);
  await expect(cart.items.filter({ hasText: products.bikeLight.name }))
    .toContainText(products.bikeLight.price);
});

test('TC-AUTO-006 @prod-safe - A product can be removed from the cart', async ({ checkoutReadyShopper }) => {
  const { inventory, cart } = checkoutReadyShopper;

  await cart.continueShoppingButton.click();
  await inventory.addToCart('sauce-labs-bike-light');
  await inventory.openCart();

  await cart.removeProduct('sauce-labs-backpack');
  await cart.expectProductAbsent(products.backpack.name);
  await cart.expectProductVisible(products.bikeLight.name);
  await expect(cart.items).toHaveCount(1);
  await expect(cart.items.filter({ hasText: products.bikeLight.name }))
    .toContainText(products.bikeLight.price);
  await inventory.expectCartCount(1);
});

test('TC-AUTO-015 @prod-safe - Checkout blocks continuation when postal code is missing', async ({ page, checkoutReadyShopper }) => {
  const { cart, checkout } = checkoutReadyShopper;

  await cart.checkoutButton.click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);

  await checkout.fillCustomerDetails(checkoutData.missingPostalCode);
  await checkout.continueToOverview();

  await checkout.expectCheckoutError('Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
});

test('TC-AUTO-007 @production-unsafe - Shopper completes checkout', async ({ page, checkoutReadyShopper }) => {
  const { cart, checkout } = checkoutReadyShopper;

  await cart.checkoutButton.click();
  await checkout.fillCustomerDetails(checkoutData.validCustomer);
  await checkout.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.cart_item')).toContainText(products.backpack.name);
  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText(`Item total: ${products.backpack.price}`);
  await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $2.40');
  await expect(page.locator('.summary_total_label')).toHaveText('Total: $32.39');

  await checkout.finishOrder();
  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(checkout.completeHeading).toBeVisible();
});
