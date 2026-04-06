import { test, expect } from '@playwright/test';

test('verify links, buttons, inputs, and streamflow', async ({ page }) => {
  // 1. Visit Home Page
  await page.goto('/');

  // Check login icon (link)
  const loginIcon = page.locator('text=👤').first();
  await expect(loginIcon).toBeVisible();

  // 2. Go to Login page
  await loginIcon.click();
  await expect(page.locator('h2', { hasText: 'Login' })).toBeVisible();

  // 3. Go to Register page using the link
  await page.click('text=Register');
  await expect(page.locator('h2', { hasText: 'Create Account' })).toBeVisible();

  // 4. Fill Register Input Fields
  const username = `testuser_${Date.now()}`;
  const email = `${username}@example.com`;
  
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'password123');
  await page.fill('input[name="confirmPassword"]', 'password123');

  // 5. Submit Registration
  await page.click('button[type="submit"]', { force: true });

  // Wait for redirect to home page "/"
  await page.waitForTimeout(1000); // give it a moment to show toast and redirect
  
  // 6. Go to Login
  await loginIcon.click();
  await expect(page.locator('h2', { hasText: 'Login' })).toBeVisible();
  
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]', { force: true });

  // Wait for redirect to home
  await page.waitForTimeout(1000);
  
  // Verify Cart Link
  const cartIcon = page.locator('text=🛒').first();
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();
  
  await expect(page.locator('h2', { hasText: 'Shopping Cart' })).toBeVisible();

  console.log('Streamflow tested successfully!');
});
