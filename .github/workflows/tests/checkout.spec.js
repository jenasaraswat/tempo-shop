import { test, expect } from '@playwright/test';
import { go, addToBag } from './helpers.js';

async function fillCheckout(page, card = '4242 4242 4242 4242') {
  await page.getByTestId('input-fullName').fill('Test User');
  await page.getByTestId('input-email').fill('test@example.com');
  await page.getByTestId('input-address').fill('1 Test Street');
  await page.getByTestId('input-city').fill('Ahmedabad');
  await page.getByTestId('input-postcode').fill('380001');
  await page.getByTestId('input-card').fill(card);
}

test.describe('Checkout', () => {
  test('checkout with empty bag redirects to bag', async ({ page }) => {
    await go(page, '/checkout');
    await expect(page.getByTestId('empty-cart')).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await addToBag(page, 'chalk-bag');
    await go(page, '/checkout');
    await page.getByTestId('place-order').click();
    await expect(page.getByTestId('error-fullName')).toBeVisible();
    await expect(page.getByTestId('error-card')).toBeVisible();
  });

  test('rejects a non-test card', async ({ page }) => {
    await addToBag(page, 'chalk-bag');
    await go(page, '/checkout');
    await fillCheckout(page, '1111 2222 3333 4444');
    await page.getByTestId('place-order').click();
    await expect(page.getByTestId('error-card')).toBeVisible();
  });

  test('places an order end to end', async ({ page }) => {
    await addToBag(page, 'pace-tee', 'S');
    await page.getByTestId('nav-cart').click();
    await page.getByTestId('checkout-btn').click();
    await fillCheckout(page);
    await page.getByTestId('place-order').click();
    await expect(page.getByTestId('order-confirmation')).toBeVisible();
    await expect(page.getByTestId('order-id')).toHaveText(/^TS\d{6}$/);
    await expect(page.getByTestId('cart-count')).toHaveText('0');
  });
});
