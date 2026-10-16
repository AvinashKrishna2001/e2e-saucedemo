import { test, expect } from '../../fixtures/test';
import users from '../../data/users.json';

test.describe('TC-MAN-004 - Logout and session termination', () => {
  test('TC-MAN-004 @prod-safe - User is logged out and cannot use protected inventory', async ({ page, loginPage }) => {
    const title = page.getByTestId('title').describe('Products page title confirming the authenticated inventory page');
    const menuButton = page.getByTestId('open-menu').describe('Navigation menu button for opening the sidebar');
    const logoutLink = page.getByTestId('logout-sidebar-link').describe('Logout link in the navigation sidebar');
    const loginButton = page.getByTestId('login-button').describe('Login button shown on the unauthenticated login page');
    const usernameInput = page.getByTestId('username').describe('Username input on the login page');
    const passwordInput = page.getByTestId('password').describe('Password input on the login page');
    const inventoryControls = page.locator('.inventory_list, .inventory_container, [data-test^="add-to-cart-"]').describe('Protected inventory controls available only to authenticated users');
    const error = page.locator('[data-test="error"]').describe('Access error explaining why unauthenticated inventory access was denied');

    await test.step('Sign in with the standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard);
      await expect(title).toHaveText('Products');
    });

    await test.step('Open the navigation menu', async () => {
      await menuButton.click();
      await expect(logoutLink).toBeVisible();
    });

    await test.step('Log out and verify the login form is reset', async () => {
      await logoutLink.click();
      await expect(loginButton).toBeVisible();
      await expect(usernameInput).toHaveValue('');
      await expect(passwordInput).toHaveValue('');
    });

    await test.step('Verify protected inventory cannot be used without a session', async () => {
      await page.goto('https://www.saucedemo.com/inventory.html');
      await expect(loginButton).toBeVisible();
      await expect(inventoryControls).toHaveCount(0);

      if (await error.isVisible()) {
        await expect(error).toBeVisible();
      }
    });
  });
});
