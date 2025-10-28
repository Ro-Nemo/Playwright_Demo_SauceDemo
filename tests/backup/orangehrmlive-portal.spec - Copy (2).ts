import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import dotenv from 'dotenv';
import path from 'path';
import { LoginPage } from '../pages/loginhrmPage';
import { UserPage } from '../pages/userhrmPage';
import { AdminPage } from '../pages/adminhrmPage';

dotenv.config({ path: path.resolve(__dirname, '../.env') });


test('CRUD in OrangeHRM portal', async ({ page }) => {

const userid = process.env.PLAYWRIGHT_USER_NAME  as string;
const password = process.env.PLAYWRIGHT_PASSWORD  as string;
// const userid = process.env.PLAYWRIGHT_USER_NAME || 'Admin';
// const password = process.env.PLAYWRIGHT_PASSWORD || 'admin123';
const fname = faker.person.firstName();
const lname = faker.person.lastName();
const EmployName = fname + ' ' + lname;
const randNumb = faker.string.numeric(8);
const EmployNumb = '9' + randNumb;
const username = 'admin' + lname;


//Precondition: An Employee must be created in PIM before it can be assigned as an Admin user" 

//GIVEN I have the admin credentials to the orangehrmlive portal and create and edit a new employee.
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
const loginPage = new LoginPage(page);
await loginPage.login(userid, password);
// await page.getByRole('textbox', { name: 'Username' }).fill(userid);
// await page.getByRole('textbox', { name: 'Password' }).fill(password);
// await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

//WHEN I Navigate to "PIM" on the side navigation bar. 
await page.getByRole('link', { name: 'PIM' }).click();
await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

//AND I Click on "Add." 
await page.getByRole('button', { name: ' Add' }).click();
await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

//AND I create a new employee user
const userPage = new UserPage(page);
await userPage.user(fname, lname, EmployNumb);
// await page.getByRole('textbox', { name: 'First Name' }).fill(fname);
// await page.getByRole('textbox', { name: 'Last Name' }).fill(lname);
// await page.getByRole('textbox').nth(4).dblclick();
// await page.getByRole('textbox').nth(4).fill(EmployNumb);
// await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

//AND I search the new employee
await page.getByRole('link', { name: 'PIM' }).click();
await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
await page.getByRole('textbox', { name: 'Type for hints...' }).first().click();
await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(EmployName);
await page.waitForTimeout(2000);
await page.getByRole('textbox', { name: 'Type for hints...' }).first().press('ArrowDown');
await page.getByRole('textbox', { name: 'Type for hints...' }).first().press('Enter');
await page.getByRole('button', { name: 'Search' }).click();
await expect(page.getByText(EmployNumb)).toBeVisible();

//THEN I edit the new employee
await page.getByRole('button', { name: '' }).click();
await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
const randNumb2 = faker.string.numeric(8);
const EmployNumb2 = '9' + randNumb2;
await page.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').first().dblclick();
await page.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').first().fill(EmployNumb2);
await page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();
await page.getByRole('link', { name: 'PIM' }).click();
await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
await page.getByRole('textbox', { name: 'Type for hints...' }).first().click();
await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(EmployName);
await page.waitForTimeout(2000);
await page.getByRole('textbox', { name: 'Type for hints...' }).first().press('ArrowDown');
await page.getByRole('textbox', { name: 'Type for hints...' }).first().press('Enter');
await page.getByRole('button', { name: 'Search' }).click();
await expect(page.getByText(EmployNumb2)).toBeVisible();


//GIVEN I have the admin credentials to assign a new employee as an Admin User.

//WHEN I navigate to "Admin" on the side navigation bar. 
await page.getByRole('link', { name: 'Admin' }).click();
await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

//AND I assign the new employee as an Admin User
await page.getByRole('button', { name: ' Add' }).click();
await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible();
const adminPage = new AdminPage(page);
await adminPage.user(EmployName, username, password);
// await page.locator('form i').first().click();
// await page.getByRole('option', { name: 'Admin' }).locator('span').click();
// await page.getByRole('textbox', { name: 'Type for hints...' }).click();
// await page.getByRole('textbox', { name: 'Type for hints...' }).fill(EmployName);
// await page.getByText(EmployName).click();
// await page.locator('form i').nth(1).click();
// await page.getByText('Enabled').click();
// await page.getByRole('textbox').nth(2).fill(username);
// await page.getByRole('textbox').nth(3).fill(password);
// await page.getByRole('textbox').nth(4).fill(password);
// await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

//AND I search the the new Admin User
await page.getByRole('textbox').nth(1).click();
await page.getByRole('textbox').nth(1).fill(username);
await page.getByRole('button', { name: 'Search' }).click();
await page.waitForTimeout(2000);
await expect(page.getByText(EmployName)).toBeVisible();

//AND I edit the new admin user
await page.getByRole('button', { name: '' }).click();
await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();
await page.locator('form i').nth(1).click();
await page.getByText('Disabled').click();
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
await page.getByRole('textbox').nth(1).click();
await page.getByRole('textbox').nth(1).fill(username);
await page.getByRole('button', { name: 'Search' }).click();
await expect(page.getByText(EmployName)).toBeVisible();
await expect(page.getByText('Disabled')).toBeVisible();

//THEN I delete the Admin role for the new employee
await page.getByRole('button', { name: '' }).click();
await page.getByRole('button', { name: ' Yes, Delete' }).click();
await page.getByRole('button', { name: 'Search' }).click();
await page.waitForTimeout(3000);
await expect(page.getByText(EmployName)).not.toBeVisible();

//AND I delete the new employee
await page.getByRole('link', { name: 'PIM' }).click();
await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
await page.getByRole('textbox', { name: 'Type for hints...' }).first().click();
await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(EmployName);
await page.waitForTimeout(2000);
await page.getByRole('textbox', { name: 'Type for hints...' }).first().press('ArrowDown');
await page.getByRole('textbox', { name: 'Type for hints...' }).first().press('Enter');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('button', { name: '' }).click();
await page.getByRole('button', { name: ' Yes, Delete' }).click();
await page.getByRole('button', { name: 'Search' }).click();
await page.waitForTimeout(2000);
await expect(page.getByText(EmployNumb2)).not.toBeVisible();

});

