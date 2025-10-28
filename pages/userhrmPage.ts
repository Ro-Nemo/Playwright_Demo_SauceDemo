import { Page, Locator } from '@playwright/test';

export class UserPage {
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly employnumberInput: Locator;
  readonly saveButton: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.firstnameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastnameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employnumberInput = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });

  }



  async user(firstname: string, lastname: string, employnumber: string) {
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.employnumberInput.fill(employnumber);
    await this.saveButton.click();
  }


}