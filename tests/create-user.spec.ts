import { test, expect } from '@playwright/test';

test('Create User (Happy Path)', async ({ page }) => {
  // 1. Go to login page
  await page.goto('https://beta.snippetsentry.com/login');

  // 2. Fill in username and password
  await page.getByLabel('Username*').fill('lin.dennis18@gmail.com'); 
  await page.locator('input[type="password"]').fill('Test123!'); 

  // 3. Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // 4. Wait for dashboard to load (adjust selector as needed)
  await expect(page.getByText('Manage Users')).toBeVisible();

  // 5. Navigate to "Manage Users" if not default
  await page.getByRole('link', { name: 'Manage Users' }).click();

  // 6. Click "Add User"
  await page.getByRole('button', { name: 'Add User' }).click();

  // 7. Fill in user details (use unique email for each run)
  const firstName = 'Test';
  const lastName = 'User' + Date.now();
  const email = `testuser${Date.now()}@example.com`;

  await page.getByLabel('First Name*').waitFor({ state: 'visible', timeout: 10000 });
  await page.getByLabel('First Name*').fill(firstName);
  await page.getByLabel('Last Name*').fill(lastName);
  await page.getByLabel('Email*').fill(email);

  // Optionally check "Admin"
  await page.getByLabel('Admin').check();

  // 8. Click "Save"
  await page.getByRole('button', { name: 'Save' }).click();

  // 9. Assert the new user appears in the Users List 
  await expect(page.getByText(email)).toBeVisible();
  await expect(page.getByText(firstName + ' ' + lastName)).toBeVisible();
  // await expect(page.getByText('Active')).toBeVisible();
});