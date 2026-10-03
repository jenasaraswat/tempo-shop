import { test, expect } from '@playwright/test';
import { go, addToBag } from './helpers.js';

test.describe('Bag', () => {
  test('empty bag shows message', async ({ page }) => {
    await go(page, '/cart');
    await expect(page.getByTestId('empty-cart')).toBeVisible();
  });

  test('quantity updates totals', async ({ page }) => {
    await addToBag(page, 'stride-shorts');           // £34
    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('subtotal')).toHaveText('£34.00');
    await expect(page.getByTestId('shipping')).toHaveText('£6.00');
    await page.getByTestId('qty-increase').click();
    await expect(page.getByTestId('qty-value')).toHaveText('2');
    await expect(page.getByTestId('subtotal')).toHaveText('£68.00');
  });

  test('free delivery over £75', async ({ page }) => {
    await addToBag(page, 'squat-joggers');           // £52
    await addToBag(page, 'lift-tank');               // £24 → £76
    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('shipping')).toHaveText('Free');
    await expect(page.getByTestId('total')).toHaveText('£76.00');
  });

  test('valid promo code applies 10% off', async ({ page }) => {
    await addToBag(page, 'squat-joggers');           // £52
    await page.getByTestId('nav-cart').click();
    await page.getByTestId('promo-input').fill('tempo10');
    await page.getByTestId('promo-apply').click();
    await expect(page.getByTestId('discount')).toHaveText('−£5.20');
    await expect(page.getByTestId('total')).toHaveText('£52.80');  // 46.80 + 6 delivery
  });

  test('invalid promo code shows error', async ({ page }) => {
    await addToBag(page, 'chalk-bag');
    await page.getByTestId('nav-cart').click();
    await page.getByTestId('promo-input').fill('FAKE');
    await page.getByTestId('promo-apply').click();
    await expect(page.getByTestId('promo-message')).toContainText("isn't a valid code");
  });

  test('remove item empties bag', async ({ page }) => {
    await addToBag(page, 'chalk-bag');
    await page.getByTestId('nav-cart').click();
    await page.getByTestId('remove-item').click();
    await expect(page.getByTestId('empty-cart')).toBeVisible();
  });
});
