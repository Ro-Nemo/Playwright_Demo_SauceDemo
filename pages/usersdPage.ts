import { Page, Locator } from '@playwright/test';

export class UserPage {
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly zipcodeInput: Locator;
  readonly saveButton: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.firstnameInput = page.locator('[data-test="firstName"]');
    this.lastnameInput = page.locator('[data-test="lastName"]');
    this.zipcodeInput = page.locator('[data-test="postalCode"]');
    this.saveButton = page.locator('[data-test="continue"]');

  }

  async user(firstname: string, lastname: string, zipcode: string) {
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.zipcodeInput.fill(zipcode);
    await this.saveButton.click();
  }
}

