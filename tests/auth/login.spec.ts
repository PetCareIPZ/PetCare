import { test, expect } from '@playwright/test';

test('Logowanie istniejącego użytkownika', async ({ page }) => {

    const userEmail = 'testUser@example.com';
    const userPassword = 'testUser12345';

  await page.goto('http://localhost:3000');

  const signInButton = page.getByRole('button', { name: /Zaloguj się|Sign In/i });
  await expect(signInButton).toBeVisible();
  await signInButton.click();

  const emailInput = page.getByRole('textbox', { name: /Email address|Adres e-mail/i });
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await emailInput.fill(userEmail);

  const continueButton = page.getByRole('button', { name: /Kontynuuj|Continue/i });
  if (await continueButton.isVisible()) {
    await continueButton.click();
  }

  const passwordInput = page.getByLabel(/Password|Hasło/i);
  await passwordInput.fill(userPassword);

  await page.getByRole('button', { name: /Zaloguj się|Sign In|Continue/i }).click();

  const userButton = page.locator('.cl-userButtonTrigger');
  await expect(userButton).toBeVisible({ timeout: 10000 });

  console.log('Logowanie przebiegło pomyślnie!');
});