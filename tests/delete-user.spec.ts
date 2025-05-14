import { test, expect } from '@playwright/test';

test('Delete first user from Manage Users', async ({ page }) => {
  // --- Login Steps ---
  await page.goto('https://beta.snippetsentry.com/login');
  await page.getByLabel('Username*').fill('lin.dennis18@gmail.com'); 
  await page.locator('input[type="password"]').fill('Test123!'); 
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard to load
  await expect(page.getByText('Manage Users')).toBeVisible();

  // --- Navigate to Manage Users ---
  await page.getByRole('link', { name: 'Manage Users' }).click();

  // --- Select the first user in the list ---
  const firstUserButton = page.locator('button[data-testid="user-name-in-list"]').first();
  const userFullName = await firstUserButton.textContent();
  await firstUserButton.click();

  // Wait for Modify User panel to appear
  await expect(page.getByText('Modify User')).toBeVisible();

  // --- Click Delete and confirm if prompted ---
  await page.getByRole('button', { name: 'Delete' }).click();

  // --- Wait for and check the success popup ---
  await expect(page.getByText('Please Confirm')).toBeVisible();
  await page.getByRole('button', { name: 'CONFIRM' }).click();

  // Wait for the Modify User panel to close (or for the user to disappear from the list)
  await expect(page.getByText('User status updated ')).not.toBeVisible();

  // --- Assert the user is removed from the Users List ---
  // The user's name should no longer be visible in the list
  await expect(page.locator('button[data-testid="user-name-in-list"]', { hasText: userFullName })).toHaveCount(0);
});