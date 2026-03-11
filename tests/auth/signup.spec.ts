import { test, expect } from '@playwright/test';

test('Rejestracja użytkownika', async ({ page }) => {
  
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  await page.goto('http://localhost:3000');

  // 1. Otwieranie formularza
  const signUpButton = page.getByRole('button', { name: 'Utwórz konto' });
  await expect(signUpButton).toBeVisible();
  await signUpButton.click();

  // 2. Lokalizacja pól (Definicje)
  const firstNameInput = page.getByRole('textbox', { name: 'First name' });
  const lastNameInput = page.getByRole('textbox', { name: 'Last name' });
  const emailInput = page.getByRole('textbox', { name: 'Email address' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });

  // 3. Czekanie na załadowanie pól formularza
  await expect(firstNameInput).toBeVisible({ timeout: 10000 });
  
  // 4. Wypełnianie danych
  await firstNameInput.fill('Test');
  await lastNameInput.fill('User');
  await emailInput.fill(uniqueEmail);
  await passwordInput.fill('testUser12345');

  // 5. Wysłanie formularza
  const continueButton = page.getByRole('button', { name: /Kontynuuj|Continue/i });
  await continueButton.click();

  // 6. Weryfikacja sukcesu
  const successMessage = page.getByTestId('form-feedback-success');
  
  // Sprawdzamy też alternatywnie nagłówek weryfikacji, jeśli feedback-success to tylko mały alert
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  
  console.log(`Test zakończony sukcesem dla maila: ${uniqueEmail}`);
});