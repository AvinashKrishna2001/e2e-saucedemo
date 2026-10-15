import { type Locator, type Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export type Credentials = { username: string; password: string };

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    logger.info('Navigate to SauceDemo login page');
    await this.page.goto('/');
  }

  async login(credentials: Credentials): Promise<void> {
    logger.info('Submit login form', { username: credentials.username });
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async expectError(message: string | RegExp): Promise<void> {
    await expect(this.errorMessage, 'The login validation message should be visible').toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
