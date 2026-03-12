import { test, expect } from '@playwright/test';

// Resetujemy stan autoryzacji dla tego testu. 
test.use({ storageState: { cookies: [], origins: [] } });

test('Rejestracja użytkownika', async ({ page }) => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  await page.goto('/');

  const signUpButton = page.getByRole('button', { name: /Utwórz konto|Sign Up/i });
  await expect(signUpButton).toBeVisible();
  await signUpButton.click();

  await page.getByRole('textbox', { name: /First name|Imię/i }).fill('Test');
  await page.getByRole('textbox', { name: /Last name|Nazwisko/i }).fill('User');
  await page.getByRole('textbox', { name: /Email/i }).fill(uniqueEmail);
  await page.getByRole('textbox', { name: /Password|Hasło/i }).fill('testUser12345');

  const continueButton = page.getByRole('button', { name: /Kontynuuj|Continue/i });
  await continueButton.click();

  const successMessage = page.getByTestId('form-feedback-success');
  
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  
  console.log(`Test zakończony sukcesem dla maila: ${uniqueEmail}`);
});