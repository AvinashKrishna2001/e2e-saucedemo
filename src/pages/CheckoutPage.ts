import { type Locator, type Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export type CustomerDetails = { firstName: string; lastName: string; postalCode: string };

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeading: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.completeHeading = page.getByText('Thank you for your order!', { exact: true });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCustomerDetails(details: CustomerDetails): Promise<void> {
    logger.info('Enter checkout customer details', { hasPostalCode: Boolean(details.postalCode) });
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.postalCodeInput.fill(details.postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    logger.info('Finish demo checkout');
    await this.finishButton.click();
  }

  async expectCheckoutError(message: string | RegExp): Promise<void> {
    await expect(this.errorMessage, 'Checkout validation error should be visible').toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
