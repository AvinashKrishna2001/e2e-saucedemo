import { type Locator, type Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class ProductDetailsPage {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addToCartButton: Locator;

  constructor(private readonly page: Page) {
    this.name = page.locator('.inventory_details_name').describe('Product details name');
    this.description = page.locator('.inventory_details_desc').describe('Product details description');
    this.price = page.locator('.inventory_details_price').describe('Product details price');
    this.image = page.locator('.inventory_details_img').describe('Product details image');
    this.addToCartButton = page.locator('[data-test^="add-to-cart-"]').describe('Product details add-to-cart control');
  }

  async expectLoaded(expectedName: string, expectedDescription: string, expectedPrice: string): Promise<void> {
    logger.info('Verify product details page', { productName: expectedName });
    await expect(this.name, 'Product details should show the product name').toHaveText(expectedName);
    await expect(this.description, 'Product details should show the product description').toHaveText(expectedDescription);
    await expect(this.price, 'Product details should show the product price').toHaveText(expectedPrice);
    await expect(this.image, 'Product details should show the product image').toBeVisible();
    await expect(this.addToCartButton, 'Product details should show the add-to-cart control').toBeVisible();
  }
}
