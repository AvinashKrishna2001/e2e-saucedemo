import { test, expect } from '../../fixtures/test';
import products from '../../data/products.json';
import { expectAscending, expectDescending, parsePrice } from '../../utils/assertions';

test.describe('Inventory and Product Details', () => {
  test('TC-AUTO-003 @prod-safe - Inventory page renders the expected products', async ({ authenticatedShopper }) => {
    await authenticatedShopper.expectLoaded();
    const names = await authenticatedShopper.itemNames();

    expect(names, 'Inventory should contain the expected number of products').toHaveLength(products.expectedInventoryCount);
    expect(names).toContain(products.backpack.name);
  });

  test('TC-AUTO-004 @prod-safe - Products can be sorted by price from low to high', async ({ authenticatedShopper }) => {
    await authenticatedShopper.sortBy('lohi');
    const displayedPrices = (await authenticatedShopper.itemPrices()).map(parsePrice);

    expectAscending(displayedPrices, 'Inventory prices');
    expect(await authenticatedShopper.itemNames()).toContain(products.lowestPriceProduct.name);
    await expect(authenticatedShopper.items.first().locator('.inventory_item_name'))
      .toHaveText(products.lowestPriceProduct.name);
  });

  test('TC-AUTO-011 @prod-safe - Products can be sorted by name A to Z', async ({ authenticatedShopper }) => {
    await authenticatedShopper.sortBy('az');
    const displayedNames = await authenticatedShopper.itemNames();
    const expectedNames = [...displayedNames].sort((left, right) => left.localeCompare(right));

    expect(displayedNames, 'Product names should be alphabetically ascending').toEqual(expectedNames);
  });

  test('TC-AUTO-012 @prod-safe - Products can be sorted by name Z to A', async ({ authenticatedShopper }) => {
    await authenticatedShopper.sortBy('za');
    const displayedNames = await authenticatedShopper.itemNames();
    const expectedNames = [...displayedNames].sort((left, right) => right.localeCompare(left));

    expect(displayedNames, 'Product names should be alphabetically descending').toEqual(expectedNames);
  });

  test('TC-AUTO-013 @prod-safe - Products can be sorted by price from high to low', async ({ authenticatedShopper }) => {
    await authenticatedShopper.sortBy('hilo');
    const displayedPrices = (await authenticatedShopper.itemPrices()).map(parsePrice);

    expectDescending(displayedPrices, 'Inventory prices');
  });

  test('TC-MAN-006 @prod-safe - Open and inspect the backpack product detail page', async ({ page, authenticatedShopper }) => {
    await test.step('Verify the backpack is visible in inventory', async () => {
      await expect(authenticatedShopper.items.filter({ hasText: products.backpack.name })).toBeVisible();
    });

    await test.step('Open the backpack details', async () => {
      await page.getByTestId('item-4-title-link').click();
      await expect(page.getByTestId('inventory-item-name')).toHaveText(products.backpack.name);
    });

    await test.step('Verify backpack detail information and controls', async () => {
      await expect(page.getByTestId('inventory-item-desc')).toBeVisible();
      await expect(page.getByTestId('inventory-item-desc')).not.toHaveText('');
      await expect(page.getByTestId('inventory-item-price')).toHaveText(products.backpack.price);
      await expect(page.locator('.inventory_details_img')).toBeVisible();
      await expect(page.locator('.inventory_details_img')).toHaveAccessibleName(/backpack/i);
      await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    });

    await test.step('Return to products', async () => {
      await page.getByTestId('back-to-products').click();
      await expect(authenticatedShopper.heading).toBeVisible();
    });
  });
});
