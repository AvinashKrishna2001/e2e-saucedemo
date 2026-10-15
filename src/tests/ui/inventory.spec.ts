import { test, expect } from '../../fixtures/test';
import products from '../../data/products.json';
import { expectAscending, expectDescending, parsePrice } from '../../utils/assertions';

test('TC-AUTO-003 @prod-safe - Inventory page renders the expected products', async ({ authenticatedShopper }) => {
  await authenticatedShopper.expectLoaded();
  const names = await authenticatedShopper.itemNames();

  expect(names, 'Inventory should contain the expected number of products').toHaveLength(products.expectedInventoryCount);
  expect(names, 'Inventory should show the complete default product list').toEqual(
    products.inventory.map((product) => product.name),
  );
  expect(await authenticatedShopper.itemPrices()).toEqual(
    products.inventory.map((product) => product.price),
  );
  await authenticatedShopper.expectCartCount(0);
});

test('TC-AUTO-004 @prod-safe - Products can be sorted by price from low to high', async ({ authenticatedShopper }) => {
  await authenticatedShopper.sortBy('lohi');
  const displayedPrices = (await authenticatedShopper.itemPrices()).map(parsePrice);

  expect(displayedPrices).toHaveLength(products.expectedInventoryCount);
  expectAscending(displayedPrices, 'Inventory prices');
  await expect(authenticatedShopper.items.first().locator('.inventory_item_name'))
    .toHaveText(products.lowestPriceProduct.name);
  await expect(authenticatedShopper.items.last().locator('.inventory_item_name'))
    .toHaveText(products.highestPriceProduct.name);
});

test('TC-AUTO-011 @prod-safe - Products can be sorted by name A to Z', async ({ authenticatedShopper }) => {
  await authenticatedShopper.sortBy('az');
  const displayedNames = await authenticatedShopper.itemNames();
  const expectedNames = products.inventory
    .map((product) => product.name)
    .sort((left, right) => left.localeCompare(right));

  expect(displayedNames, 'Product names should be alphabetically ascending').toEqual(expectedNames);
});

test('TC-AUTO-012 @prod-safe - Products can be sorted by name Z to A', async ({ authenticatedShopper }) => {
  await authenticatedShopper.sortBy('za');
  const displayedNames = await authenticatedShopper.itemNames();
  const expectedNames = products.inventory
    .map((product) => product.name)
    .sort((left, right) => right.localeCompare(left));

  expect(displayedNames, 'Product names should be alphabetically descending').toEqual(expectedNames);
});

test('TC-AUTO-013 @prod-safe - Products can be sorted by price from high to low', async ({ authenticatedShopper }) => {
  await authenticatedShopper.sortBy('hilo');
  const displayedPrices = (await authenticatedShopper.itemPrices()).map(parsePrice);

  expect(displayedPrices).toHaveLength(products.expectedInventoryCount);
  expectDescending(displayedPrices, 'Inventory prices');
  await expect(authenticatedShopper.items.first().locator('.inventory_item_name'))
    .toHaveText(products.highestPriceProduct.name);
  await expect(authenticatedShopper.items.last().locator('.inventory_item_name'))
    .toHaveText(products.lowestPriceProduct.name);
});
