import { test, expect } from '@playwright/test';

test('Logowanie istniejącego użytkownika', async ({ page }) => {
  const userEmail = 'yehexir856@bigonla.com';
  const userPassword = 'passwordfortestuser1!';

  await page.goto('http://localhost:3000');

  const signInButton = page.getByRole('button', { name: /Zaloguj się|Sign In/i });
  await expect(signInButton).toBeVisible();
  await signInButton.click();

  const emailInput = page.getByRole('textbox', { name: /Email address|Adres e-mail/i });
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await emailInput.fill(userEmail);

  await page.waitForTimeout(500); 
  await emailInput.press('Enter');

  const passwordInput = page.getByRole('textbox', { name: /Password|Hasło/i });
  await expect(passwordInput).toBeVisible({ timeout: 15000 });
  await passwordInput.fill(userPassword);

  const finalSignIn = page.getByRole('button', { name: /Zaloguj się|Sign In|Continue|Kontynuuj/i }).last();
  await finalSignIn.click();

  const userButton = page.locator('.cl-userButtonTrigger');
  await expect(userButton).toBeVisible({ timeout: 15000 });

  console.log('Logowanie przebiegło pomyślnie!');
});