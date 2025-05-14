import { test, expect } from '@playwright/test';

test('Update/Edit User Information', async ({ page }) => {
  // --- Login Steps ---
  await page.goto('https://beta.snippetsentry.com/login');
  await page.getByLabel('Username*').fill('lin.dennis18@gmail.com'); 
  await page.locator('input[type="password"]').fill('Test123!'); 
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard to load
  await expect(page.getByText('Manage Users')).toBeVisible();

  // --- Navigate to Manage Users ---
  await page.getByRole('link', { name: 'Manage Users' }).click();

  // --- Select the first test user ---
  const firstTestUserButton = page.locator('button[data-testid="user-name-in-list"]').first();
  const userFullName = await firstTestUserButton.textContent();
  await firstTestUserButton.click();

  // Wait for Modify User panel to appear
  await expect(page.getByText('Modify User')).toBeVisible();

  // --- Change fields ---
  const newNotes = 'Updated by Playwright test';
  const adminCheckbox = page.getByLabel('Admin');
  const wasChecked = await adminCheckbox.isChecked();

  // Toggle admin status
  if (wasChecked) {
    await adminCheckbox.uncheck();
  } else {
    await adminCheckbox.check();
  }

  await page.getByLabel('Notes').fill(newNotes);

  // --- Save changes ---
  await page.getByRole('button', { name: 'Save' }).click();

  // --- Assert toggled admin status change ---
  await expect(page.getByLabel('Notes')).toHaveValue(newNotes);
  if (wasChecked) {
    await expect(adminCheckbox).not.toBeChecked();
  } else {
    await expect(adminCheckbox).toBeChecked();
  }

});
