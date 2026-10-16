import { test, expect } from '../../fixtures/test';

test.describe('Product Detail - Inventory and Detail Data Consistency', () => {
  test('TC-MAN-007 @prod-safe - Backpack inventory data matches product detail data', async ({
    page,
    authenticatedShopper,
  }) => {
    let inventoryName = '';
    let inventoryDescription = '';
    let inventoryPrice = '';

    await test.step('Read the Sauce Labs Backpack data from inventory', async () => {
      await authenticatedShopper.expectLoaded();

      const backpackCard = page
        .getByTestId('inventory-item')
        .filter({ hasText: 'Sauce Labs Backpack' })
        .describe('Inventory card for the Sauce Labs Backpack');
      const backpackName = backpackCard
        .getByTestId('inventory-item-name')
        .describe('Sauce Labs Backpack name on the inventory card');
      const backpackDescription = backpackCard
        .getByTestId('inventory-item-desc')
        .describe('Sauce Labs Backpack description on the inventory card');
      const backpackPrice = backpackCard
        .getByTestId('inventory-item-price')
        .describe('Sauce Labs Backpack price on the inventory card');

      await expect(backpackCard).toBeVisible();
      inventoryName = await backpackName.innerText();
      inventoryDescription = await backpackDescription.innerText();
      inventoryPrice = await backpackPrice.innerText();

      await expect(backpackName).toHaveText('Sauce Labs Backpack');
    });

    await test.step('Open the Backpack product detail', async () => {
      const backpackCard = page
        .getByTestId('inventory-item')
        .filter({ hasText: inventoryName })
        .describe('Inventory card for the selected Sauce Labs Backpack');
      const backpackName = backpackCard
        .getByTestId('inventory-item-name')
        .describe('Selected Sauce Labs Backpack name link');

      await backpackName.click();
      await expect(page.getByTestId('inventory-item-name')
        .describe('Sauce Labs Backpack name on the product detail page'))
        .toBeVisible();
    });

    await test.step('Compare inventory and detail data and verify the product image', async () => {
      const detailName = page
        .getByTestId('inventory-item-name')
        .describe('Sauce Labs Backpack name on the product detail page');
      const detailDescription = page
        .getByTestId('inventory-item-desc')
        .describe('Sauce Labs Backpack description on the product detail page');
      const detailPrice = page
        .getByTestId('inventory-item-price')
        .describe('Sauce Labs Backpack price on the product detail page');
      const productImage = page
        .locator('.inventory_details_img')
        .describe('Sauce Labs Backpack product detail image');

      await expect(detailName).toHaveText(inventoryName);
      await expect(detailDescription).toHaveText(inventoryDescription);
      await expect(detailPrice).toHaveText(inventoryPrice);
      await expect(productImage).toBeVisible();
    });

    await test.step('Return to the inventory products', async () => {
      const backToProducts = page
        .getByTestId('back-to-products')
        .describe('Back to products button on the product detail page');

      await backToProducts.click();
      await authenticatedShopper.expectLoaded();
    });
  });
});
