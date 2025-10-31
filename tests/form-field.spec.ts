import { test, expect } from '@playwright/test';

test('Complete form submission and validation', async ({ page }) => {

    //Navigate to page
    await page.goto('https://practice-automation.com/');

    //Navigate to target page
    await expect(page.getByRole('link', { name: 'Form Fields' })).toBeVisible();
    await page.getByRole('link', { name: 'Form Fields' }).click();

    // Check if navigation was successful
    await expect(page.getByRole('heading')).toContainText('Form Fields');

    // We input text into name field and check if it matches our input
    await page.getByTestId('name-input').fill('Divesh');
    await expect(page.getByTestId('name-input')).toHaveValue('Divesh');

    /* Input password into field and subsequently check if it has the correct value
     (not sure how this would be done on actual client?!?)*/
    await page.getByRole('textbox', { name: 'Password' }).fill('PlayWright');
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('PlayWright');

    // Check the Water drink and assert it 
    await page.getByText('Milk').click();
    await expect(page.getByTestId('drink2')).toBeChecked();

    // Check the Blue checkbox and assert it
    await page.getByText('Blue').click();
    await expect(page.getByTestId('color2')).toBeChecked();

    // Select yes under dropdown for do you like automation and check it 
    await page.getByTestId('automation').selectOption('yes');
    await expect(page.getByTestId('automation')).toHaveValue('yes');

    // Fill out email address and assert
    await page.getByTestId('email').fill('diveshj@domain.com');
    await expect(page.getByTestId('email')).toHaveValue('diveshj@domain.com');

    // Assert Message is entered
    await page.getByTestId('message').fill('Its a great day!');
    await expect(page.getByTestId('message')).toHaveValue('Its a great day!');

    //Handle the pop up
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => { });
    });
    await page.getByTestId('submit-btn').click();

    // To check that the pop up has successfully been dismissed
    await expect(page.getByTestId('submit-btn')).toBeVisible();
});