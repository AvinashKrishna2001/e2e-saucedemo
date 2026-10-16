import { type Locator, type Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class InventoryPage {
  readonly heading: Locator;
  readonly items: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText('Products', { exact: true });
    this.items = page.locator('.inventory_item');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.getByTestId('menuButton').describe('Inventory navigation menu button');
    this.logoutLink = page.getByTestId('logout-sidebar-link').describe('Logout link in the navigation sidebar');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading, 'Inventory heading should be visible after login').toBeVisible();
    await expect(this.items.first(), 'At least one inventory item should be rendered').toBeVisible();
  }

  async itemNames(): Promise<string[]> {
    return this.items.locator('.inventory_item_name').allTextContents();
  }

  async itemPrices(): Promise<string[]> {
    return this.items.locator('.inventory_item_price').allTextContents();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    logger.info('Sort inventory', { option });
    await this.sortSelect.selectOption(option);
  }

  async addToCart(productSlug: string): Promise<void> {
    logger.info('Add product to cart', { productSlug });
    await this.page.getByTestId(`add-to-cart-${productSlug}`).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    logger.info('Open inventory navigation menu');
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    logger.info('Log out of SauceDemo session');
    await this.logoutLink.click();
  }

  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge, 'Cart badge should disappear when the cart is empty').toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }
}
