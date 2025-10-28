import { test, expect } from '@playwright/test';

test('create new account', async ({ page }) => {
  await page.goto('https://github.com/');

    //Comment ctrl+k+c and ctrl+k+u    //Comment multiple lines (ctrl + ;)
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Build and ship software/);
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Create your free account' })).toBeVisible();


  //// import {setTimeout} from "node:timers/promises";          await setTimeout(2000);

});


