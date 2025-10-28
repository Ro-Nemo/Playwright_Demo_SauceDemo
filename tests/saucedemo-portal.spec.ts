import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import dotenv from 'dotenv';
import path from 'path';
import { LoginPage } from '../pages/loginsdPage';
import { UserPage } from '../pages/usersdPage';

dotenv.config({ path: path.resolve(__dirname, '../.env') });


test('Online purchase in SauceDemo portal', async ({ page }) => {

const userid = process.env.PLAYWRIGHT_USER_NAME2  as string;
const password = process.env.PLAYWRIGHT_PASSWORD2  as string;
const fname = faker.person.firstName();
const lname = faker.person.lastName();
const zipcode = faker.location.zipCode();

//GIVEN I have the admin credentials to the SauceDemo portal and begin a pusrchase.
await page.goto('https://www.saucedemo.com/');
await expect(page.getByText('Swag Labs')).toBeVisible();
const loginPage = new LoginPage(page);
await loginPage.login(userid, password);

//WHEN I Navigate to "About" page. 
await expect(page.locator('[data-test="title"]')).toContainText('Products');
await page.getByRole('button', { name: 'Open Menu' }).click();
await page.locator('[data-test="about-sidebar-link"]').click();
await expect(page.locator('h1')).toContainText('Build apps users love with AI-driven quality');
await page.goBack();
await expect(page.locator('[data-test="title"]')).toContainText('Products');

//AND I add an item to the shopping cart. 
await page.locator('[data-test="item-4-title-link"]').click();
await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
await page.locator('[data-test="add-to-cart"]').click();
await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
await page.locator('[data-test="shopping-cart-link"]').click();
await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
await expect(page.locator('[data-test="item-quantity"]')).toContainText('1');

//AND I remove the item from the shopping cart.
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
await expect(page.locator('[data-test="item-4-title-link"]')).toBeHidden();

//AND I add multiple items to the shopping cart.
await page.locator('[data-test="continue-shopping"]').click();

await page.locator('[data-test="item-4-title-link"]').click();
await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
await page.locator('[data-test="add-to-cart"]').click();
await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
await page.locator('[data-test="back-to-products"]').click();

await page.locator('[data-test="item-0-title-link"]').click();
await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
await page.locator('[data-test="add-to-cart"]').click();
await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
await page.locator('[data-test="back-to-products"]').click();

await page.locator('[data-test="item-1-title-link"]').click();
await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$15.99');
await page.locator('[data-test="add-to-cart"]').click();
await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');
await page.locator('[data-test="shopping-cart-link"]').click();

await expect(page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Backpackcarry.' }).locator('[data-test="item-quantity"]')).toBeVisible();
await expect(page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Bike LightA red' }).locator('[data-test="item-quantity"]')).toBeVisible();
await expect(page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Bolt T-ShirtGet' }).locator('[data-test="item-quantity"]')).toBeVisible();


//THEN I Checkout the items in the shopping cart.
await page.locator('[data-test="checkout"]').click();
await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');

const userPage = new UserPage(page);
await userPage.user(fname, lname, zipcode);

await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
await expect(page.locator('.summary_subtotal_label')).toContainText('Item total: $55.97');
await page.locator('[data-test="finish"]').click();
await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
});

