import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../data/users.json';
import { logger } from '../utils/logger';

export type CheckoutReadyShopper = {
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
};

type FrameworkFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedShopper: InventoryPage;
  checkoutReadyShopper: CheckoutReadyShopper;
  productionSafetyGuard: void;
};

export const test = base.extend<FrameworkFixtures>({
  productionSafetyGuard: [async ({}, use, testInfo) => {
    const targetEnvironment = (process.env.TARGET_ENV ?? process.env.ENV ?? 'local').toLowerCase();
    const writesApproved = (process.env.ALLOW_PRODUCTION_WRITES ?? 'false').toLowerCase() === 'true';
    const hasProductionUnsafeTag = testInfo.title.includes('@production-unsafe');

    if (targetEnvironment === 'prod' && hasProductionUnsafeTag && !writesApproved) {
      logger.warn('Skipping production-unsafe test because production writes are not approved', {
        title: testInfo.title,
        environment: targetEnvironment,
      });
      test.skip(true, 'Safety guard: checkout is blocked in prod unless ALLOW_PRODUCTION_WRITES=true.');
    }
    await use();
  }, { auto: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  authenticatedShopper: async ({ loginPage, inventoryPage }, use) => {
    logger.info('Fixture setup: create an authenticated shopper session');
    await loginPage.goto();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
  checkoutReadyShopper: async ({ authenticatedShopper, cartPage, checkoutPage }, use) => {
    logger.info('Fixture setup: establish cart state required by checkout scenario');
    await authenticatedShopper.addToCart('sauce-labs-backpack');
    await authenticatedShopper.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectProductVisible('Sauce Labs Backpack');
    await use({ inventory: authenticatedShopper, cart: cartPage, checkout: checkoutPage });
  },
});

export { expect };
