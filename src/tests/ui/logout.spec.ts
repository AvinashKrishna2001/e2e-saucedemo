import { test, expect } from '../../fixtures/test';
import users from '../../data/users.json';
import { logger } from '../../utils/logger';

test.describe('Logout and protected inventory access', () => {
  test('TC-MAN-004 @prod-safe - Logout ends the session and blocks unauthenticated inventory access', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await test.step('Sign in and verify the Products page', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard);

      await expect(page).toHaveURL(/inventory\.html$/);
      await expect(
        page.getByTestId('title').describe('Products page title'),
        'The authenticated inventory page should show the Products title',
      ).toHaveText('Products');
    });

    await test.step('Open the menu and verify logout is available', async () => {
      await inventoryPage.openMenu();
      await expect(
        inventoryPage.logoutLink,
        'The logout link should be visible in the open navigation menu',
      ).toBeVisible();
    });

    await test.step('Log out and verify the login form is empty', async () => {
      await inventoryPage.logout();
      await expect(
        loginPage.loginButton,
        'Logout should return the user to the login page',
      ).toBeVisible();
      await expect(loginPage.usernameInput).toHaveValue('');
      await expect(loginPage.passwordInput).toHaveValue('');
    });

    await test.step('Verify direct inventory access is blocked without a session', async () => {
      await page.goto('/inventory.html');

      const accessError = page.locator('[data-test="error"]').describe('Unauthenticated inventory access error');
      if (await accessError.isVisible()) {
        logger.error('Unauthenticated inventory access returned an application error', {
          message: await accessError.textContent(),
        });
      }

      await expect(
        loginPage.loginButton,
        'Unauthenticated inventory navigation should return to the login form',
      ).toBeVisible();
      await expect(
        page.locator('.inventory_item'),
        'Unauthenticated users must not see usable inventory controls',
      ).toHaveCount(0);
    });
  });
});
