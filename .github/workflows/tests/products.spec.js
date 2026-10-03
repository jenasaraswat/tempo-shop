import { test, expect } from '@playwright/test';
import { go } from './helpers.js';

test.describe('Product listing', () => {
  test('filter by category', async ({ page }) => {
    await go(page, '/products');
    await page.getByTestId('filter-accessories').click();
    await expect(page.getByTestId('result-count')).toHaveText('2 products');
    await expect(page).toHaveURL(/category=accessories/);
  });

  test('search narrows results', async ({ page }) => {
    await go(page, '/products');
    await page.getByTestId('search-input').fill('tee');
    await expect(page.getByTestId('result-count')).toHaveText('1 product');
    await expect(page.getByTestId('product-card-pace-tee')).toBeVisible();
  });

  test('search with no match shows empty state', async ({ page }) => {
    await go(page, '/products');
    await page.getByTestId('search-input').fill('zzz');
    await expect(page.getByTestId('no-results')).toBeVisible();
  });

  test('sort by price low to high', async ({ page }) => {
    await go(page, '/products');
    await page.getByTestId('sort-select').selectOption('price-asc');
    const prices = await page.getByTestId('product-grid').getByTestId('product-price').allTextContents();
    const nums = prices.map((p) => Number(p.replace('£', '')));
    expect(nums).toEqual([...nums].sort((a, b) => a - b));
  });
});

test.describe('Product detail', () => {
  test('requires a size before adding', async ({ page }) => {
    await go(page, '/products/pace-tee');
    await page.getByTestId('add-to-bag').click();
    await expect(page.getByTestId('size-error')).toBeVisible();
    await expect(page.getByTestId('cart-count')).toHaveText('0');
  });

  test('adds item with size to bag', async ({ page }) => {
    await go(page, '/products/pace-tee');
    await page.getByTestId('size-L').click();
    await page.getByTestId('add-to-bag').click();
    await expect(page.getByTestId('added-message')).toBeVisible();
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('sold-out product cannot be added', async ({ page }) => {
    await go(page, '/products/warmup-hoodie');
    await expect(page.getByTestId('add-to-bag')).toBeDisabled();
    await expect(page.getByTestId('add-to-bag')).toHaveText('Sold out');
  });
});
