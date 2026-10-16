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

  test('TC-MAN-006 @prod-safe - User can open the Sauce Labs Backpack product details', async ({ authenticatedShopper, productDetailsPage }) => {
    await test.step('Open the Sauce Labs Backpack product details', async () => {
      await authenticatedShopper.openProduct(products.backpack.name);
      await expect(productDetailsPage.name, 'Product details page should be displayed').toBeVisible();
    });

    await test.step('Inspect the product details', async () => {
      await productDetailsPage.expectLoaded(
        products.backpack.name,
        products.backpack.description,
        products.backpack.price,
      );
    });
  });
});
