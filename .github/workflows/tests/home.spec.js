import { test, expect } from '@playwright/test';
import { go } from './helpers.js';

test.describe('Home', () => {
  test('shows hero and featured products', async ({ page }) => {
    await go(page, '/');
    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('featured-grid').locator('a')).toHaveCount(4);
  });

  test('hero button opens the shop', async ({ page }) => {
    await go(page, '/');
    await page.getByTestId('hero-shop-btn').click();
    await expect(page).toHaveURL(/#\/products$/);
    await expect(page.getByTestId('result-count')).toHaveText('8 products');
  });

  test('unknown route shows not found', async ({ page }) => {
    await go(page, '/does-not-exist');
    await expect(page.getByTestId('not-found')).toBeVisible();
  });
});
