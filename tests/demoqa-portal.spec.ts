import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';


test('Text Box in DemoQA portal', async ({ page }) => {
const fname = faker.person.firstName();
const lname = faker.person.lastName();
const employName = fname + ' ' + lname;
const email = lname + '@guerrillamail.com';   
const address = faker.location.streetAddress({ useFullAddress: true });
const city = faker.location.city();
const state = faker.location.state({ abbreviated: true });
const zipcode = faker.location.zipCode();
const country = faker.location.country(); 
const fulladdress = address + ', ' + city + ', ' + state + ' ' + zipcode + ', ' + country;

await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Text Box' }).click();
await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();
await page.getByRole('textbox', { name: 'Full Name' }).fill(employName);
await page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
await page.getByRole('textbox', { name: 'Current Address' }).fill(fulladdress);
await page.locator('#permanentAddress').fill(fulladdress);
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('Name:')).toBeVisible();
});


test('Check Box', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Check Box' }).click();
await expect(page.getByRole('heading', { name: 'Check Box' })).toBeVisible();

await page.getByRole('button', { name: 'Toggle' }).click();
await page.getByRole('listitem').filter({ hasText: /^Desktop$/ }).getByLabel('Toggle').click();
await page.locator('label').filter({ hasText: 'Notes' }).getByRole('img').first().check();
await expect(page.locator('label').filter({ hasText: 'Notes' }).getByRole('img').first()).toBeChecked();
await expect(page.getByText('You have selected :')).toBeVisible();
await expect(page.getByText('notes', { exact: true })).toBeVisible();

await page.getByRole('listitem').filter({ hasText: /^Documents$/ }).getByLabel('Toggle').click();
await page.getByRole('listitem').filter({ hasText: /^WorkSpace$/ }).getByLabel('Toggle').click();
await page.locator('label').filter({ hasText: 'Angular' }).getByRole('img').first().check();
await expect(page.locator('label').filter({ hasText: 'Angular' }).getByRole('img').first()).toBeChecked();
await expect(page.getByText('You have selected :')).toBeVisible();
await expect(page.getByText('angular', { exact: true })).toBeVisible();

await page.getByRole('listitem').filter({ hasText: /^Office$/ }).getByLabel('Toggle').click();
await page.locator('label').filter({ hasText: 'Classified' }).getByRole('img').first().check();
await expect(page.locator('label').filter({ hasText: 'Classified' }).getByRole('img').first()).toBeChecked();
await expect(page.getByText('You have selected :')).toBeVisible();
await expect(page.getByText('classified', { exact: true })).toBeVisible();

await page.getByRole('listitem').filter({ hasText: /^Downloads$/ }).getByLabel('Toggle').click();
await page.locator('label').filter({ hasText: 'Excel File.doc' }).getByRole('img').first().check();
await expect(page.locator('label').filter({ hasText: 'Excel File.doc' }).getByRole('img').first()).toBeChecked();
await expect(page.getByText('You have selected :')).toBeVisible();
await expect(page.getByText('excelFile')).toBeVisible();
});


test('Radio Button', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Radio Button' }).click();
await expect(page.getByRole('heading', { name: 'Radio Button' })).toBeVisible();

await page.getByText('Yes').check();
await expect(page.locator('label').filter({ hasText: 'Yes' })).toBeChecked();
await expect(page.getByText('You have selected Yes')).toBeVisible();

await page.getByText('Impressive').check();
await expect(page.locator('label').filter({ hasText: 'Impressive' })).toBeChecked();
await expect(page.getByText('You have selected Impressive')).toBeVisible();

await page.locator('div').filter({ hasText: /^No$/ }).click();
await expect(page.getByText('No')).toBeDisabled();
});


test('CRUD Web Tables', async ({ page }) => {
const fname = faker.person.firstName();
const lname = faker.person.lastName();
const email = lname + '@guerrillamail.com';  
const age = faker.string.numeric(2);
const fourdigits = faker.string.numeric(4);
// const twodecimals = faker.string.numeric(2);
// const salary = fourdigits + '.' + twodecimals;
const Department = faker.person.jobArea(); 
const fourdigits2 = faker.string.numeric(4);

await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Web Tables' }).click();
await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();
await page.getByRole('button', { name: 'Add' }).click();
await expect(page.getByText('Registration Form')).toBeVisible();

await page.getByRole('textbox', { name: 'First Name' }).fill(fname);
await page.getByRole('textbox', { name: 'Last Name' }).fill(lname);
await page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
await page.getByRole('textbox', { name: 'Age' }).fill(age);
await page.getByRole('textbox', { name: 'Salary' }).fill(fourdigits);
await page.getByRole('textbox', { name: 'Department' }).fill(Department);
await page.getByRole('button', { name: 'Submit' }).click();

await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();
await page.getByRole('textbox', { name: 'Type to search' }).fill(fname);
await expect(page.getByRole('grid')).toContainText(fname);
await expect(page.getByRole('grid')).toContainText(lname);
await expect(page.getByRole('grid')).toContainText(email);
await expect(page.getByRole('grid')).toContainText(age);
await expect(page.getByRole('grid')).toContainText(fourdigits);
await expect(page.getByRole('grid')).toContainText(Department);

await page.getByTitle('Edit').getByRole('img').click();
await expect(page.getByText('Registration Form')).toBeVisible();
await page.getByRole('textbox', { name: 'Salary' }).fill(fourdigits2);
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();

await page.getByTitle('Delete').locator('path').click();
await expect(page.getByRole('grid')).not.toContainText(fname);
await expect(page.getByRole('grid')).not.toContainText(lname);
await expect(page.getByRole('grid')).not.toContainText(email);
await expect(page.getByRole('grid')).not.toContainText(age);
await expect(page.getByRole('grid')).not.toContainText(fourdigits2);
await expect(page.getByRole('grid')).not.toContainText(Department);
});


test('Buttons', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Buttons' }).click();
await expect(page.getByRole('heading', { name: 'Buttons' })).toBeVisible();

await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
await expect(page.getByText('You have done a double click')).toBeVisible();

await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
await expect(page.getByText('You have done a right click')).toBeVisible();

await page.getByRole('button', { name: 'Click Me', exact: true }).click();
await expect(page.getByText('You have done a dynamic click')).toBeVisible();
});


test('Links', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: /^Links$/ }).click();
await expect(page.getByRole('heading', { name: 'Links', exact: true })).toBeVisible();

const page4Promise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'Home', exact: true }).click();
const page4 = await page4Promise;
await expect(page4.getByRole('link', { name: 'Selenium Online Training' })).toBeVisible();

// await page.bringToFront();     //Focus shifts to the Main tab
// await page4.bringToFront();    //Focus shifts to the New tab
await page4.close();    //Close current Tab

await expect(page.getByRole('heading', { name: 'Links', exact: true })).toBeVisible();
await expect(page.getByText('Following links will send an')).toBeVisible();
await page.getByRole('link', { name: 'Created' }).click();
await expect(page.locator('#linkResponse')).toContainText('Link has responded with staus 201 and status text Created');
await page.getByRole('link', { name: 'No Content' }).click();
await expect(page.locator('#linkResponse')).toContainText('Link has responded with staus 204 and status text No Content');
await page.getByRole('link', { name: 'Moved' }).click();
await expect(page.locator('#linkResponse')).toContainText('Link has responded with staus 301 and status text Moved Permanently');
});


test('Broken Links - Images', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Broken Links - Images' }).click();
await expect(page.getByRole('heading', { name: 'Broken Links - Images' })).toBeVisible();
await expect(page.locator('img').nth(2)).toBeVisible();
await expect(page.locator('img').nth(3)).toBeVisible();
await page.getByRole('link', { name: 'Click Here for Valid Link' }).click();
await expect(page.getByRole('link', { name: 'Selenium Online Training' })).toBeVisible();
await page.goBack();
await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
await expect(page.getByText('This page returned a 500')).toBeVisible();
await page.goBack();
});


test('Upload and Download', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Upload and Download' }).click();
await expect(page.getByRole('heading', { name: 'Upload and Download' })).toBeVisible();

const download1Promise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download' }).click();
  const download1 = await download1Promise;

// await page.getByRole('button', { name: 'Select a file' }).setInputFiles(path.join(__dirname, 'playwrightlogo.jpg'));    //file in tests folder
await page.getByRole('button', { name: 'Select a file' }).setInputFiles('./tests/dummy_files/playwrightlogo.jpg');
await expect(page.getByText('C:\\fakepath\\playwrightlogo.jpg')).toBeVisible();
});


test('Dynamic Properties', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByRole('listitem').filter({ hasText: 'Dynamic Properties' }).click();
await expect(page.getByRole('heading', { name: 'Dynamic Properties' })).toBeVisible();

await expect(page.getByRole('button', { name: 'Will enable 5 seconds' })).toBeVisible();
const locator = page.getByRole('button', { name: 'Will enable 5 seconds' });
await expect(locator).not.toBeEnabled();

await expect(page.getByRole('button', { name: 'Color Change' })).toBeVisible();
await expect(page.getByRole('button', { name: 'Color Change' })).toHaveCSS('color', 'rgb(255, 255, 255)');   // Example: White is HEX ##ffffff color, RGB value is (255,255,255) - Font Color

await expect(page.getByRole('button', { name: 'Visible After 5 Seconds' })).not.toBeVisible();

await page.waitForTimeout(5000);
await expect(locator).toBeEnabled();
await page.getByRole('button', { name: 'Will enable 5 seconds' }).click();
await expect(page.getByRole('button', { name: 'Color Change' })).toHaveCSS('color', 'rgb(220, 53, 69)');   // Example: Red is HEX ##dc3545 color, RGB value is (220,53,69) - Font Color
await expect(page.getByRole('button', { name: 'Visible After 5 Seconds' })).toBeVisible();
});


test('Practice Form', async ({ page }) => {
const fname = faker.person.firstName();
const lname = faker.person.lastName();
const email = lname + '@guerrillamail.com';  
const phoneNumb = faker.number.int({ min: 1000000000, max: 9999999999 }); 
//const start = faker.date.soon(); const end = faker.date.soon({ refDate: start });
//const birthDate = faker.date.between({ from: '2025-01-01', to: Date.now() });
const birthDate = faker.date.birthdate();
const address = faker.location.streetAddress({ useFullAddress: true });
const city = faker.location.city();
const state = faker.location.state({ abbreviated: true });
const zipcode = faker.location.zipCode();
const country = faker.location.country(); 
const fulladdress = address + ', ' + city + ', ' + state + ' ' + zipcode + ', ' + country;

await page.goto('https://demoqa.com/elements');
await page.locator('span').filter({ hasText: 'Forms' }).locator('div').first().click();
await page.getByText('Practice Form').click();
await expect(page.getByRole('heading', { name: 'Practice Form' })).toBeVisible();

await page.getByRole('textbox', { name: 'First Name' }).fill(fname);
await page.getByRole('textbox', { name: 'Last Name' }).fill(lname);
await page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
await page.getByText('Male', { exact: true }).check();
await expect(page.getByText('Male', { exact: true })).toBeChecked();
await page.getByRole('textbox', { name: 'Mobile Number' }).fill(phoneNumb.toString());   //convert the Date object to a string using .toISOString() for Dates/time,  or .toString() for int/float
await page.locator('#dateOfBirthInput').fill(birthDate.toISOString());   //convert the Date object to a string using .toISOString() for Dates/time,  or .toString() for int/float
await page.locator('#subjectsInput').fill('computer science');
await page.getByText('Computer Science', { exact: true }).click();
await page.getByText('Sports').check();
await expect(page.getByText('Sports')).toBeChecked();
await page.getByText('Reading').check();
await expect(page.getByText('Reading')).toBeChecked();
await page.getByText('Music').check();
await expect(page.getByText('Music')).toBeChecked();
await page.getByRole('button', { name: 'Select picture' }).setInputFiles('./tests/dummy_files/playwrightlogo.jpg');
await expect(page.getByRole('button', { name: 'Select picture' })).toHaveValue('C:\\fakepath\\playwrightlogo.jpg');
await page.getByRole('textbox', { name: 'Current Address' }).fill(fulladdress);
await page.locator('#state svg').click();
await page.getByText('NCR', { exact: true }).click();
await page.locator('#city svg').click();
await page.getByText('Delhi', { exact: true }).click();
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.locator('#example-modal-sizes-title-lg')).toContainText('Thanks for submitting the form');
});


test('Browser Windows', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.locator('span').filter({ hasText: 'Alerts, Frame & Windows' }).locator('div').first().click();
await page.getByRole('listitem').filter({ hasText: 'Browser Windows' }).click();
await expect(page.getByRole('heading', { name: 'Browser Windows' })).toBeVisible();

const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
  await page1.close();    //Close current Tab/Window

const page5Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window', exact: true }).click();
  const page5 = await page5Promise;
  await expect(page5.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
  await page5.close();    //Close current Tab/Window

const page11Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window Message' }).click();
  const page11 = await page11Promise;
  await expect(page11.locator('body')).toContainText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
  await page11.close();    //Close current Tab/Window
});


test('Alerts', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Alerts, Frame & Windows').click();
await page.getByText('Alerts', { exact: true }).click();
await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();

page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toContain("You clicked a button");
    dialog.accept().catch(() => {});      //Accepting the Confirmation Alert
    //dialog.dismiss().catch(() => {});   //Dismissing the Confirmation Alert
  });
   await page.locator('#alertButton').click();

page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toContain("This alert appeared after 5 seconds");
    dialog.accept().catch(() => {});
  });
  await page.locator('#timerAlertButton').click();
 await page.waitForTimeout(6000);

page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toContain("Do you confirm action?");
    dialog.accept().catch(() => {});
  });
  await page.locator('#confirmButton').click();
 await expect(page.locator('#confirmResult')).toContainText('You selected Ok');

page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toContain("Do you confirm action?");
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#confirmButton').click();
 await expect(page.locator('#confirmResult')).toContainText('You selected Cancel');

page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toContain("Please enter your name");
    dialog.accept('John');     //Insert custom value in prompt and accept or dismiss
    //dialog.accept().catch(() => {});
  });
 await page.locator('#promtButton').click();
await expect(page.locator('#promptResult')).toContainText('You entered John');
});


test('Frames', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Alerts, Frame & Windows').click();
await page.getByText('Frames', { exact: true }).click();
await expect(page.getByRole('heading', { name: 'Frames' })).toBeVisible();

await page.locator('#frame1').contentFrame().getByRole('heading', { name: 'This is a sample page' }).click();
await expect(page.locator('#frame1').contentFrame().getByRole('heading', { name: 'This is a sample page' })).toBeVisible();

await page.locator('#frame2').contentFrame().getByRole('heading', { name: 'This is a sample page' }).click();
await expect(page.locator('#frame2').contentFrame().getByRole('heading', { name: 'This is a sample page' })).toBeVisible();

await expect(page.getByText('Sample Iframe page There are')).toBeVisible();
});


test('Nested Frames', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Alerts, Frame & Windows').click();
await page.getByText('Nested Frames').click();
await expect(page.getByRole('heading', { name: 'Nested Frames' })).toBeVisible();

await page.locator('#frame1').contentFrame().getByText('Parent frame').click();

await page.locator('#frame1').contentFrame().locator('iframe').contentFrame().getByText('Child Iframe').click();
await page.locator('#frame1').contentFrame().locator('iframe').contentFrame().locator('html').click();

await expect(page.getByText('Sample Nested Iframe page.')).toBeVisible();
});


test('Modal Dialogs', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Alerts, Frame & Windows').click();
await page.getByText('Modal Dialogs').click();
await expect(page.getByRole('heading', { name: 'Modal Dialogs' })).toBeVisible();

await page.getByRole('button', { name: 'Small modal' }).click();
await expect(page.getByText('This is a small modal. It has')).toBeVisible();
await page.locator('#closeSmallModal').click();

await page.getByRole('button', { name: 'Large modal' }).click();
await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible();
await page.locator('#closeLargeModal').click();
});


test('Accordian', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Accordian').click();
await expect(page.getByRole('heading', { name: 'Accordian' })).toBeVisible();

await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible();

await page.getByText('Where does it come from?').click();
await expect(page.getByText('Contrary to popular belief,')).toBeVisible();
await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible();

await page.getByText('Why do we use it?').click();
await expect(page.getByText('It is a long established fact')).toBeVisible();
await expect(page.getByText('Contrary to popular belief,')).not.toBeVisible();
await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible();
});


test('Auto Complete', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Auto Complete').click();
await expect(page.getByRole('heading', { name: 'Auto Complete' })).toBeVisible();

await page.locator('.auto-complete__value-container').first().click();
await page.locator('#autoCompleteMultipleInput').fill('b');
await page.getByText('Blue', { exact: true }).click();

await page.locator('div').filter({ hasText: /^Blue$/ }).nth(2).click();
await page.locator('#autoCompleteMultipleInput').fill('b');
await page.getByText('Black', { exact: true }).click();

await page.locator('#autoCompleteSingleInput').fill('g');
await page.getByText('Green', { exact: true }).click();
});


test('Date Picker', async ({ page }) => {
const anyDate = faker.date.anytime();
const anyMonth = faker.date.month();
const dateTime = anyMonth + ' ' + '22, 2025 2:34 PM';

await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Date Picker').click();
await expect(page.getByRole('heading', { name: 'Date Picker' })).toBeVisible();

await page.locator('#datePickerMonthYearInput').fill(anyDate.toISOString());

await page.locator('#dateAndTimePickerInput').fill(dateTime);

await page.getByRole('heading', { name: 'Date Picker' }).click();
});


test('Slider', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Slider').click();
await expect(page.getByRole('heading', { name: 'Slider' })).toBeVisible();

await expect(page.locator('#sliderValue')).toHaveValue('25');
await page.getByRole('slider').fill('39');
await expect(page.locator('#sliderValue')).toHaveValue('39');
});


test('Progress Bar', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Progress Bar').click();
await expect(page.getByRole('heading', { name: 'Progress Bar' })).toBeVisible();

await page.getByRole('button', { name: 'Start' }).click();
await expect(page.getByText('Progress BarProgress Bar100%')).toBeVisible();
});


test('Tabs', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Tabs').click();
await expect(page.getByRole('heading', { name: 'Tabs' })).toBeVisible();

await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible();

await page.getByRole('tab', { name: 'Origin' }).click();
await expect(page.getByText('Contrary to popular belief,')).toBeVisible();
await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible();

await page.getByRole('tab', { name: 'Use' }).click();
await expect(page.getByText('It is a long established fact')).toBeVisible();
await expect(page.getByText('Contrary to popular belief,')).not.toBeVisible();
await expect(page.getByText('Lorem Ipsum is simply dummy')).not.toBeVisible();
});


test('Tool Tips', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Tool Tips').click();
await expect(page.getByRole('heading', { name: 'Tool Tips' })).toBeVisible();

await page.getByRole('button', { name: 'Hover me to see' }).hover();
await expect(page.locator('#buttonToolTip')).toContainText('You hovered over the Button');

await page.getByRole('textbox', { name: 'Hover me to see' }).hover();
await expect(page.locator('#textFieldToolTip')).toContainText('You hovered over the text field');

await page.getByRole('link', { name: 'Contrary' }).hover();
await expect(page.locator('#contraryTexToolTip')).toContainText('You hovered over the Contrary');

await page.getByRole('link', { name: '1.10.32' }).hover();
await expect(page.locator('#sectionToolTip')).toContainText('You hovered over the 1.10.32');
});


test('Menu', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.locator('span').filter({ hasText: /^Menu$/ }).click();
await expect(page.getByRole('heading', { name: 'Menu' })).toBeVisible();

await page.getByRole('link', { name: 'Main Item 2' }).hover();
await expect(page.getByRole('link', { name: 'Sub Item' }).first()).toBeVisible();
await expect(page.getByRole('link', { name: 'Sub Item' }).nth(1)).toBeVisible();
await expect(page.getByRole('link', { name: 'SUB SUB LIST »' })).toBeVisible();

await page.getByRole('link', { name: 'SUB SUB LIST »' }).hover();
await expect(page.getByRole('link', { name: 'Sub Sub Item 1' })).toBeVisible();
await expect(page.getByRole('link', { name: 'Sub Sub Item 2' })).toBeVisible();
});


test('Select Menu', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Widgets').click();
await page.getByText('Select Menu').click();
await expect(page.getByRole('heading', { name: 'Select Menu' })).toBeVisible();

await page.locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1).click();
await page.getByText('A root option', { exact: true }).click();

await page.locator('#selectOne div').filter({ hasText: 'Select Title' }).nth(1).click();
await page.getByText('Prof.', { exact: true }).click();

await page.locator('#oldSelectMenu').selectOption('2');

await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
await page.locator('#react-select-4-option-1').click();
await page.locator('#selectMenuContainer svg').nth(4).click();
await page.locator('div').filter({ hasText: /^Blue$/ }).nth(1).click();
await page.locator('#react-select-4-option-2').click();
await page.locator('div:nth-child(3) > .css-19bqh2r').click();

await page.locator('#cars').selectOption('audi');
});


test('Sortable', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Interactions').click();
await page.getByText('Sortable').click();
await expect(page.getByRole('heading', { name: 'Sortable' })).toBeVisible();

// Pick Locator Example:
// getByLabel('List').getByText('One')
// getByLabel('List').getByText('Two')
// getByLabel('Grid').getByText('One')
// getByLabel('Grid').getByText('Two')

// Solution to Sort: 
// getByLabel('List').getByText('')  or  getByLabel('Grid').getByText('')

const listItems = await page.getByLabel('List').getByText('').allTextContents();
const expectedSortedItems = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']; // Your expected sorted order
expect(listItems).toEqual(expectedSortedItems);

await page.getByRole('tab', { name: 'Grid' }).click();
const listItems2 = await page.getByLabel('Grid').getByText('').allTextContents();
const expectedSortedItems2 = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']; // Your expected sorted order
expect(listItems2).toEqual(expectedSortedItems2);
});


test('Selectable', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Interactions').click();
await page.getByText('Selectable').click();
await expect(page.getByRole('heading', { name: 'Selectable' })).toBeVisible();

await expect(page.getByText('Cras justo odio')).toHaveCSS('background-color', 'rgb(255, 255, 255)');   // Example: White is HEX ##ffffff color, RGB value is (255,255,255) - Background Color
await page.getByText('Cras justo odio').click();
await expect(page.getByText('Cras justo odio')).toHaveCSS('background-color', 'rgb(0, 123, 255)');   // Example: White is HEX ##ffffff color, RGB value is (255,255,255)  - Background Color

await expect(page.getByText('Dapibus ac facilisis in')).toHaveCSS('background-color', 'rgb(255, 255, 255)');   
await page.getByText('Dapibus ac facilisis in').click();
await expect(page.getByText('Dapibus ac facilisis in')).toHaveCSS('background-color', 'rgb(0, 123, 255)');   

await expect(page.getByText('Morbi leo risus')).toHaveCSS('background-color', 'rgb(255, 255, 255)');   
await page.getByText('Morbi leo risus').click();
await expect(page.getByText('Morbi leo risus')).toHaveCSS('background-color', 'rgb(0, 123, 255)');   

await expect(page.getByText('Porta ac consectetur ac')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Porta ac consectetur ac').click();
await expect(page.getByText('Porta ac consectetur ac')).toHaveCSS('background-color', 'rgb(0, 123, 255)');   

await page.getByRole('tab', { name: 'Grid' }).click();

await expect(page.getByText('One')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('One').click();
await expect(page.getByText('One')).toHaveCSS('background-color', 'rgb(0, 123, 255)');   

await expect(page.getByText('Two')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Two').click();
await expect(page.getByText('Two')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Three')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Three').click();
await expect(page.getByText('Three')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Four')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Four').click();
await expect(page.getByText('Four')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Five')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Five').click();
await expect(page.getByText('Five')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Six')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Six').click();
await expect(page.getByText('Six')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Seven')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Seven').click();
await expect(page.getByText('Seven')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Eight')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Eight').click();
await expect(page.getByText('Eight')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  

await expect(page.getByText('Nine')).toHaveCSS('background-color', 'rgb(255, 255, 255)');  
await page.getByText('Nine').click();
await expect(page.getByText('Nine')).toHaveCSS('background-color', 'rgb(0, 123, 255)');  
});


test('Resizable', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Interactions').click();
await page.getByText('Resizable').click();
await expect(page.getByRole('heading', { name: 'Resizable' })).toBeVisible();

await expect(page.locator('#resizableBoxWithRestriction')).toHaveCSS('width', '200px');
await expect(page.locator('#resizableBoxWithRestriction')).toHaveCSS('height', '200px');

const textFieldSelector = '#resizableBoxWithRestriction';
  // Use page.evaluate() to run a script on the page
  await page.evaluate((textFieldSelector) => {
    const element = document.querySelector(textFieldSelector) as HTMLElement;
    if (element) {
      // Set new width and height values
      element.style.width = '150px';
      element.style.height = '150px';
    }
  }, textFieldSelector);

await expect(page.locator('#resizableBoxWithRestriction')).toHaveCSS('width', '150px');
await expect(page.locator('#resizableBoxWithRestriction')).toHaveCSS('height', '150px');

  // Use page.evaluate() to run a script on the page
  await page.evaluate((textFieldSelector) => {
    const element = document.querySelector(textFieldSelector) as HTMLElement;
    if (element) {
      // Set new width and height values
      element.style.width = '500px';
      element.style.height = '300px';
    }
  }, textFieldSelector);

await expect(page.locator('#resizableBoxWithRestriction')).toHaveCSS('width', '500px');
await expect(page.locator('#resizableBoxWithRestriction')).toHaveCSS('height', '300px');
});


test('Droppable', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Interactions').click();
await page.getByText('Droppable').click();
await expect(page.getByRole('heading', { name: 'Droppable' })).toBeVisible();

await expect(page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');  
await page.getByText('Drag me', { exact: true }).dragTo(page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable'));
await expect(page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');  

await page.getByRole('tab', { name: 'Accept' }).click();

await expect(page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');  
await page.getByText('Acceptable', { exact: true }).dragTo(page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable'));
await expect(page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)'); 

await page.reload();
await page.getByRole('tab', { name: 'Accept' }).click();

await expect(page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');  
await page.getByText('Not Acceptable').dragTo(page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable'));
await expect(page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');  

await page.getByRole('tab', { name: 'Prevent Propogation' }).click();

await expect(page.getByText('Inner droppable (not greedy)')).toBeVisible();
await expect(page.locator('#notGreedyDropBox').getByText('Outer droppable')).toBeVisible();
await page.getByText('Drag Me', { exact: true }).dragTo(page.getByText('Inner droppable (not greedy)'));
await expect(page.locator('#notGreedyInnerDropBox').getByText('Dropped!')).toBeVisible();
await expect(page.getByText('Dropped!').first()).toBeVisible();

await expect(page.getByText('Inner droppable (greedy)')).toBeVisible();
await expect(page.getByText('Outer droppable')).toBeVisible();
await page.getByText('Drag Me', { exact: true }).dragTo(page.getByText('Inner droppable (greedy)'));
await expect(page.locator('#greedyDropBoxInner').getByText('Dropped!')).toBeVisible();
await expect(page.getByText('Outer droppable')).toBeVisible();
await page.getByText('Drag Me', { exact: true }).dragTo(page.getByText('Outer droppable'));
await expect(page.locator('#greedyDropBoxInner').getByText('Dropped!')).toBeVisible();
await expect(page.getByText('Dropped!').nth(2)).toBeVisible();

await page.getByRole('tab', { name: 'Revert Draggable' }).click();

await expect(page.getByText('Will Revert')).toHaveCSS('position', 'relative');
await expect(page.getByText('Will Revert')).toHaveCSS('left', '0px');
await expect(page.getByText('Will Revert')).toHaveCSS('top', '0px');
await page.getByText('Will Revert').dragTo(page.getByLabel('Revert Draggable').getByText('Drop here'));
await expect(page.getByText('Will Revert')).toHaveCSS('position', 'relative');
await expect(page.getByText('Will Revert')).toHaveCSS('left', '0px');
await expect(page.getByText('Will Revert')).toHaveCSS('top', '0px');
await expect(page.getByLabel('Revert Draggable').getByText('Dropped!')).toBeVisible();

await page.reload();
await page.getByRole('tab', { name: 'Revert Draggable' }).click();

await expect(page.getByText('Not Revert')).toHaveCSS('position', 'relative');
await expect(page.getByText('Not Revert')).toHaveCSS('left', '0px');
await expect(page.getByText('Not Revert')).toHaveCSS('top', '0px');
await page.getByText('Not Revert').dragTo(page.getByLabel('Revert Draggable').getByText('Drop here'));
await expect(page.getByText('Not Revert')).toHaveCSS('position', 'relative');
await expect(page.getByText('Not Revert')).toHaveCSS('left', '249px');
await expect(page.getByText('Not Revert')).toHaveCSS('top', '-74px');
await expect(page.getByLabel('Revert Draggable').getByText('Dropped!')).toBeVisible();
});


test('Dragabble', async ({ page }) => {
await page.goto('https://demoqa.com/elements');
await page.getByText('Interactions').click();
await page.getByText('Dragabble').click();
await expect(page.getByRole('heading', { name: 'Dragabble' })).toBeVisible();

await expect(page.getByText('Drag me')).toHaveCSS('position', 'relative');
await expect(page.getByText('Drag me')).toHaveCSS('left', '0px');
await expect(page.getByText('Drag me')).toHaveCSS('top', '0px');
await page.getByText('Drag me').dragTo(page.getByRole('heading', { name: 'Dragabble' }));
await expect(page.getByText('Drag me')).toHaveCSS('position', 'relative');
await expect(page.getByText('Drag me')).toHaveCSS('left', '229px');
await expect(page.getByText('Drag me')).toHaveCSS('top', '-140px');

await page.getByRole('tab', { name: 'Axis Restricted' }).click();

await expect(page.getByText('Only X')).toHaveCSS('position', 'relative');
await expect(page.getByText('Only X')).toHaveCSS('left', '0px');
await expect(page.getByText('Only X')).toHaveCSS('top', '0px');
await page.getByText('Only X').dragTo(page.getByText('Sortable'));
await expect(page.getByText('Only X')).toHaveCSS('position', 'relative');
await expect(page.getByText('Only X')).toHaveCSS('left', '-400px');
await expect(page.getByText('Only X')).toHaveCSS('top', '0px');

await expect(page.getByText('Only Y')).toHaveCSS('position', 'relative');
await expect(page.getByText('Only Y')).toHaveCSS('left', '0px');
await expect(page.getByText('Only Y')).toHaveCSS('top', '0px');
await page.getByText('Only Y').dragTo(page.getByRole('tab', { name: 'Cursor Style' }));
await expect(page.getByText('Only Y')).toHaveCSS('position', 'relative');
await expect(page.getByText('Only Y')).toHaveCSS('left', '0px');
await expect(page.getByText('Only Y')).toHaveCSS('top', '-81px');
});