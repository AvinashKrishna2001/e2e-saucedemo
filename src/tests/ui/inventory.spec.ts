import { test, expect } from '../../fixtures/test';
import products from '../../data/products.json';
import { expectAscending, parsePrice } from '../../utils/assertions';

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
