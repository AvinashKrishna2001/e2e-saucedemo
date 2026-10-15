import { type Locator, type Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class CartPage {
  readonly heading: Locator;
  readonly items: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText('Your Cart', { exact: true });
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async removeProduct(productSlug: string): Promise<void> {
    logger.info('Remove product from cart', { productSlug });
    await this.page.getByTestId(`remove-${productSlug}`).click();
  }

  async expectProductVisible(name: string): Promise<void> {
    await expect(this.items.filter({ hasText: name })).toBeVisible();
  }

  async expectProductAbsent(name: string): Promise<void> {
    await expect(this.items.filter({ hasText: name })).toHaveCount(0);
  }
}
