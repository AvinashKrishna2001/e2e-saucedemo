import { test, expect } from '../../fixtures/test';
import users from '../../data/users.json';
import products from '../../data/products.json';

test('TC-AUTO-001 @prod-safe - Standard user can sign in successfully', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard);

  await expect(page).toHaveURL(/inventory\.html$/);
  await inventoryPage.expectLoaded();
  await expect(inventoryPage.items).toHaveCount(products.expectedInventoryCount);
  await inventoryPage.expectCartCount(0);
});

test('TC-AUTO-002 @prod-safe - Locked-out user receives a clear authentication error', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.lockedOut);

  await loginPage.expectError('Sorry, this user has been locked out.');
  await expect(page).toHaveURL(/\/$/);
});

test('TC-AUTO-008 @prod-safe - Invalid username and password are rejected', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.invalid);

  await loginPage.expectError('Username and password do not match any user in this service');
  await expect(page).not.toHaveURL(/inventory\.html$/);
});

test('TC-AUTO-009 @prod-safe - Empty username displays required-field validation', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.emptyUsername);

  await loginPage.expectError('Username is required');
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});

test('TC-AUTO-010 @prod-safe - Empty password displays required-field validation', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.emptyPassword);

  await loginPage.expectError('Password is required');
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});
