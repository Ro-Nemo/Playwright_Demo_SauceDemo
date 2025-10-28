import { Page, Locator } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly userroleInput: Locator;
  readonly adminroleInput: Locator;
  readonly employnameInput: Locator;
  readonly selectemploynameInput: Locator;
  readonly statusInput: Locator;
  readonly enablestatusInput: Locator;
  readonly usernameInput: Locator;
  readonly password1Input: Locator;
  readonly password2Input: Locator;
  readonly saveButton: Locator;
  readonly delay: Promise<void>;

 

  constructor(page: Page) {
    this.page = page;
    this.userroleInput = page.locator('form i').first();
    this.adminroleInput = page.getByRole('option', { name: 'Admin' }).locator('span');
    this.employnameInput = page.getByRole('textbox', { name: 'Type for hints...' });
    this.selectemploynameInput = page.getByRole('option').first();
    this.delay = page.waitForTimeout(2000);
    this.statusInput = page.locator('form i').nth(1);
    this.enablestatusInput = page.getByText('Enabled');
    this.usernameInput = page.getByRole('textbox').nth(2);
    this.password1Input = page.getByRole('textbox').nth(3);
    this.password2Input = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });

  }


  async user(employname: string, username: string, password: string): Promise<void> {
    await this.userroleInput.click();
    await this.adminroleInput.click();
    await this.employnameInput.fill(employname);
    await this.delay;
    await this.selectemploynameInput.click();
    await this.statusInput.click();
    await this.enablestatusInput.click();
    await this.usernameInput.fill(username);
    await this.password1Input.fill(password);
    await this.password2Input.fill(password);
    await this.saveButton.click();

  }


}