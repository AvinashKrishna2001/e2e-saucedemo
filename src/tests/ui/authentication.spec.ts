import { test, expect } from '../../fixtures/test';
import users from '../../data/users.json';

test('TC-AUTO-001 @prod-safe - Standard user can sign in successfully', async ({ page, loginPage, inventoryPage }) => {
  // A valid login should redirect to inventory and render the authenticated page.
  await loginPage.goto();
  await loginPage.login(users.standard);

  await expect(page).toHaveURL(/inventory\.html$/);
  await inventoryPage.expectLoaded();
});

test('TC-AUTO-002 @prod-safe - Locked-out user receives a clear authentication error', async ({ loginPage }) => {
  // A locked-out account must be rejected with the expected user-facing message.
  await loginPage.goto();
  await loginPage.login(users.lockedOut);

  await loginPage.expectError('Sorry, this user has been locked out.');
});

test('TC-AUTO-008 @prod-safe - Invalid username and password are rejected', async ({ page, loginPage }) => {
  // Invalid credentials should show an error and must not grant access to inventory.
  await loginPage.goto();
  await loginPage.login(users.invalid);

  await loginPage.expectError(/Username and password do not match/);
  await expect(page).not.toHaveURL(/inventory\.html$/);
});

test('TC-AUTO-009 @prod-safe - Empty username displays required-field validation', async ({ loginPage }) => {
  // Submitting without a username should trigger required-field validation.
  await loginPage.goto();
  await loginPage.login(users.emptyUsername);

  await loginPage.expectError('Username is required');
});

test('TC-AUTO-010 @prod-safe - Empty password displays required-field validation', async ({ loginPage }) => {
  // A username without a password should trigger the corresponding validation.
  await loginPage.goto();
  await loginPage.login(users.emptyPassword);

  await loginPage.expectError('Password is required');
});
