import { test, expect } from '../../fixtures/test';
import users from '../../data/users.json';
import products from '../../data/products.json';

test.describe('Product Detail Inspection', () => {
  test('TC-MAN-006 @prod-safe - User can inspect the Sauce Labs Backpack details', async ({ page, loginPage, inventoryPage }) => {
    await test.step('Sign in as the standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard);
      await expect(page).toHaveURL(/inventory\.html$/);
      await inventoryPage.expectLoaded();
    });

    const backpackCard = page
      .locator('.inventory_item')
      .filter({ hasText: products.backpack.name })
      .describe('Sauce Labs Backpack product card');

    await test.step('Locate the Sauce Labs Backpack product', async () => {
      await expect(backpackCard).toBeVisible();
    });

    await test.step('Open the Backpack product details', async () => {
      const backpackName = page
        .getByTestId('item-4-title-link')
        .describe('Sauce Labs Backpack product name link');
      await backpackName.click();
      await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
    });

    await test.step('Verify the Backpack product details', async () => {
      const detailName = page
        .getByTestId('inventory-item-name')
        .describe('Backpack detail product name');
      const detailDescription = page
        .getByTestId('inventory-item-desc')
        .describe('Backpack detail product description');
      const detailPrice = page
        .getByTestId('inventory-item-price')
        .describe('Backpack detail product price');
      const backpackImage = page
        .locator('.inventory_details_img')
        .describe('Backpack detail product image');
      const addToCartButton = page
        .getByRole('button', { name: 'Add to cart' })
        .describe('Backpack detail Add to cart button');

      await expect(detailName).toHaveText(products.backpack.name);
      await expect(detailDescription).toBeVisible();
      const description = await detailDescription.textContent();
      expect(description?.trim()).not.toBe('');
      await expect(detailPrice).toHaveText(products.backpack.price);
      await expect(backpackImage).toBeVisible();
      await expect(backpackImage).toHaveAttribute('alt', products.backpack.name);
      await expect(addToCartButton).toBeVisible();
    });

    await test.step('Return to the products inventory', async () => {
      const backToProducts = page
        .getByTestId('back-to-products')
        .describe('Back to products button');
      await backToProducts.click();
      await expect(page).toHaveURL(/inventory\.html$/);
      await expect(inventoryPage.heading).toHaveText('Products');
    });
  });
});
