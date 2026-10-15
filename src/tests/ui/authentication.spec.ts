import { test, expect } from '../../fixtures/test';
import users from '../../data/users.json';

test('TC-AUTO-001 @prod-safe - Standard user can sign in successfully', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard);

  await expect(page).toHaveURL(/inventory\.html$/);
  await inventoryPage.expectLoaded();
});

test('TC-AUTO-002 @prod-safe - Locked-out user receives a clear authentication error', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.lockedOut);

  await loginPage.expectError('Sorry, this user has been locked out.');
});
