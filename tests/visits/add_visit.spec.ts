import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('Pełny proces dodawania wizyty', async ({ page }) => {
    const animalName = 'a'; 
  
    // 1. Nawigacja do dashboardu
    await page.goto('/dashboard/visits');

    // 2. Lokalizacja linku (używamy regex dla elastyczności)
    const addVisitLink = page.getByRole('link', { name: /Nowa wizyta|Zarejestruj wizyt/i });
    
    // Weryfikacja widoczności z jasnym komunikatem o błędzie autoryzacji
    await expect(addVisitLink, 'Link "Nowa wizyta" nie jest widoczny. Czy użytkownik jest zalogowany?')
        .toBeVisible({ timeout: 10000 });
    
    await addVisitLink.click();
    
    // 3. Weryfikacja przejścia na stronę rejestracji
    await expect(page).toHaveURL(/.*visit-registration/);

    // 4. Wybór zwierzaka i wypełnienie danych
    await page.getByText(animalName, { exact: true }).first().click();

    // Upewnij się, że nazwa pola 'data' jest poprawna w HTML
    await page.locator('input[name="data"]').fill('2026-03-20');

    // Typ wizyty i uwagi
    await page.getByRole('combobox').selectOption({ label: 'Groomer' });
    await page.getByPlaceholder(/Opcjonalne uwagi/i).fill('Testowa uwaga automatyczna');

    // 5. Zapisanie i powrót
    await page.getByRole('button', { name: /Zarejestruj wizytę/i }).click();

    // Czekamy na automatyczne przekierowanie po zapisie
    await expect(page).toHaveURL(/.*dashboard\/visits/);
    
    // Odświeżamy i sprawdzamy listę
    await page.reload(); 
    await expect(page.getByText(animalName).first()).toBeVisible({ timeout: 15000 });
});