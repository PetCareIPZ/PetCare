import { test, expect } from '@playwright/test';

// Resetujemy stan autoryzacji dla tego testu. 
// Rejestracja musi odbywać się w stanie "wylogowanym".
test.use({ storageState: { cookies: [], origins: [] } });

test('Rejestracja użytkownika', async ({ page }) => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  // Przejście na stronę główną (korzystając z baseURL)
  await page.goto('/');

  // 1. Otwieranie formularza rejestracji
  // Używamy regex /i, aby test był odporny na małe/wielkie litery
  const signUpButton = page.getByRole('button', { name: /Utwórz konto|Sign Up/i });
  await expect(signUpButton).toBeVisible();
  await signUpButton.click();

  // 2. Wypełnianie danych
  // Playwright automatycznie poczeka na widoczność tych pól po kliknięciu signUpButton
  await page.getByRole('textbox', { name: /First name|Imię/i }).fill('Test');
  await page.getByRole('textbox', { name: /Last name|Nazwisko/i }).fill('User');
  await page.getByRole('textbox', { name: /Email/i }).fill(uniqueEmail);
  await page.getByRole('textbox', { name: /Password|Hasło/i }).fill('testUser12345');

  // 3. Wysłanie formularza
  const continueButton = page.getByRole('button', { name: /Kontynuuj|Continue/i });
  await continueButton.click();

  // 4. Weryfikacja sukcesu
  // Jeśli Clerk lub Twoja aplikacja wyświetla komunikat o sukcesie
  const successMessage = page.getByTestId('form-feedback-success');
  
  // Zwiększony timeout (10s) na wypadek wolniejszej odpowiedzi backendu
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  
  console.log(`Test zakończony sukcesem dla maila: ${uniqueEmail}`);
});