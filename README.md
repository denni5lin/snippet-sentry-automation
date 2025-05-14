# SnippetSentry Playwright Test Suite

This repository contains end-to-end tests for the SnippetSentry web application using [Playwright](https://playwright.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## Setup

1. **Clone the repository** (if you haven’t already):

   ```bash
   git clone git@gitlab.com:dlin1/snippet-sentry-automation.git
   cd snippet-sentry-automation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

## Configuration

- Update your test files with valid credentials for your environment:
  ```typescript
  await page.getByLabel('Username*').fill('YOUR_USERNAME');
  await page.getByLabel('Password*').fill('YOUR_PASSWORD');
  ```
- Optionally, you can use environment variables or a `.env` file for credentials and import them in your tests.

## Running Tests

- **Run all tests:**
  ```bash
  npx playwright test
  ```

- **Run a specific test file:**
  ```bash
  npx playwright test tests/your-test-file.spec.ts
  ```

- **Run tests in headed mode (see the browser):**
  ```bash
  npx playwright test --headed
  ```

- **Show HTML report after tests:**
  ```bash
  npx playwright show-report
  ```

## Writing and Modifying Tests

- Test files are located in the `tests/` directory.
- Each test file is a TypeScript file ending with `.spec.ts`.
- You can add, modify, or remove tests as needed.

## Example Test Flow

1. **Login** to the application.
2. **Navigate** to the "Manage Users" section.
3. **Perform actions** such as creating, editing, or deleting users.
4. **Assert** that the UI updates as expected.

## Troubleshooting

- If you encounter timeouts, try increasing the test timeout in your test file:
  ```typescript
  test.setTimeout(60000); // 60 seconds
  ```
- If selectors change, update them in your test scripts accordingly.
- For debugging, you can use:
  ```bash
  npx playwright test --debug
  ```

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
