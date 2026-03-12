import { test, expect } from '@playwright/test';

test('Pełny proces dodawania wizyty', async ({ page }) => {
    const animalName = 'a'; 
  
    await page.goto('http://localhost:3000/dashboard/visits');

    // 1. KLIKNIĘCIE I CZEKANIE NA NAWIGACJĘ
    const addVisitLink = page.getByRole('link', { name: /Nowa wizyta|Zarejestruj wizyt/i });
    
    // Czekamy, aż link będzie gotowy do kliknięcia
    await expect(addVisitLink).toBeEnabled({ timeout: 10000 });
    
    // Klikamy i upewniamy się, że URL się zmienił na podstronę rejestracji
    await addVisitLink.click();
    
    // To wymusi na Playwright poczekanie, aż aplikacja faktycznie przejdzie pod nowy adres
    await expect(page).toHaveURL(/.*visits\/visit-registration/, { timeout: 10000 });

    // 2. Wybór zwierzaka z listy
    // Jeśli zwierzaki ładują się z API, warto poczekać chwilę dłużej
    const animalOption = page.getByText(animalName, { exact: true }).first();
    await expect(animalOption).toBeVisible({ timeout: 10000 });
    await animalOption.click();

    // 3. Data wizyty
    const dateInput = page.locator('input[name="data"]');
    await expect(dateInput).toBeVisible();
    await dateInput.fill('2026-03-20');

    // 4. Typ wizyty
    await page.getByRole('combobox').selectOption({ label: 'Groomer' });

    // 5. Uwagi
    await page.getByPlaceholder(/Opcjonalne uwagi/i).fill('Testowa uwaga automatyczna');

    // 6. Zapisanie wizyty i powrót
    const submitButton = page.getByRole('button', { name: /Zarejestruj wizytę/i });
    await submitButton.click();

    // Po kliknięciu "Zarejestruj" poczekajmy aż formularz zniknie/nastąpi przekierowanie
    // zamiast wymuszać page.goto zbyt wcześnie
    await expect(page).toHaveURL(/.*dashboard\/visits/, { timeout: 10000 });

    // --- WERYFIKACJA ---
    
    // Sprawdzamy czy wizyta jest na liście (może być potrzebne odświeżenie jeśli aplikacja tego nie robi)
    await page.reload(); 
    await expect(page.getByText(animalName).first()).toBeVisible({ timeout: 15000 });
    
    // Przegląd / Dashboard
    await page.getByRole('link', { name: 'PetCare' }).click();
    await expect(page).toHaveURL(/.*dashboard(\/)?$/);
    await expect(page.getByText(animalName).first()).toBeVisible({ timeout: 10000 });
});