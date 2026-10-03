import { test, expect } from '@playwright/test';
import { go } from './helpers.js';

test.describe('Login', () => {
  test('wrong password shows error', async ({ page }) => {
    await go(page, '/login');
    await page.getByTestId('login-email').fill('demo@tempo.test');
    await page.getByTestId('login-password').fill('wrong');
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('login-error')).toBeVisible();
  });

  test('valid login opens account', async ({ page }) => {
    await go(page, '/login');
    await page.getByTestId('login-email').fill('demo@tempo.test');
    await page.getByTestId('login-password').fill('Tempo@123');
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('account-email')).toHaveText('demo@tempo.test');
    await expect(page.getByTestId('nav-account')).toHaveText('Demo');
  });

  test('account page requires login', async ({ page }) => {
    await go(page, '/account');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('logout returns to home', async ({ page }) => {
    await go(page, '/login');
    await page.getByTestId('login-email').fill('demo@tempo.test');
    await page.getByTestId('login-password').fill('Tempo@123');
    await page.getByTestId('login-submit').click();
    await page.getByTestId('logout-btn').click();
    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('nav-account')).toHaveText('Log in');
  });
});
