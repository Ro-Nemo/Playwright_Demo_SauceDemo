import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  //https://cloudtesting.contosotraders.com/

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page).toHaveTitle(/reliable/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Started' }).click();
  //await page.getByRole('link', { name: 'Start' }).click();


  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  //await page.waitForTimeout(999999);
  //await page.pause();

    // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);

});
