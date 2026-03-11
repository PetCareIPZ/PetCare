import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Proces logowania
  const signInButton = page.getByRole('button', { name: /Zaloguj się|Sign In/i });
  await signInButton.click();

  const emailInput = page.getByRole('textbox', { name: /Email address|Adres e-mail/i });
  await emailInput.fill('yehexir856@bigonla.com');
  await emailInput.press('Enter');

  const passwordInput = page.getByRole('textbox', { name: /Password|Hasło/i });
  await expect(passwordInput).toBeVisible({ timeout: 15000 });
  await passwordInput.fill('passwordfortestuser1!');
  
  await page.getByRole('button', { name: /Zaloguj się|Sign In|Continue|Kontynuuj/i }).last().click();

  // Czekamy, aż dashboard się załaduje, aby upewnić się, że sesja jest aktywna
  await expect(page.locator('.cl-userButtonTrigger')).toBeVisible({ timeout: 15000 });

  // ZAPIS STANU DO PLIKU
  await page.context().storageState({ path: authFile });
});