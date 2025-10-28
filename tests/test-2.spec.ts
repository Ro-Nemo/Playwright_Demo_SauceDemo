import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
//https://fakerjs.dev/guide/     https://fakerjs.dev/api/
//Comment multiple lines (ctrl + ;)


test('faker test', async ({ page }) => {

// Use faker seed in each test below to mantain same value
//faker.seed(123);         
const fname = faker.person.firstName();

//faker.seed(123);
const fname2 = faker.person.firstName();

const lname = faker.person.lastName();
const EmployName = fname + ' ' + lname;
const username = 'admin' + lname;

//let EmployNumb = faker.string.numeric({ length: 9, exclude: ['0'] });
let randNumb = faker.string.numeric(8);
let EmployNumb = '9' + randNumb;


  await page.goto('https://br.search.yahoo.com/?fr2=p:fprd,mkt:br');
  
  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(fname);
  await page.waitForTimeout(3000);

  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(fname);
  await page.waitForTimeout(3000);


  await page.getByRole('combobox', { name: 'Termo buscado' }).fill('bmw');
  await page.waitForTimeout(3000);

  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(fname2);
  await page.waitForTimeout(3000);

  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(lname);
  await page.waitForTimeout(3000);
  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(EmployName);
  await page.waitForTimeout(3000);
  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(username);
  await page.waitForTimeout(3000);
  await page.getByRole('combobox', { name: 'Termo buscado' }).fill(EmployNumb);
});


// test('faker test II ', async ({ page }) => {

// faker.seed(123);
// const fname = faker.person.firstName();

//   await page.goto('https://br.search.yahoo.com/?fr2=p:fprd,mkt:br');
//   await page.getByRole('combobox', { name: 'Termo buscado' }).fill(fname);
//   await page.waitForTimeout(3000);

// });