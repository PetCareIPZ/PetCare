import { test, expect } from '@playwright/test';

test('Dodawanie zwierzaka', async ({ page }) => {
  
    await page.goto('http://localhost:3000/dashboard/animals');

    // Kliknięcie w link dodawania
    const addAnimalLink = page.getByRole('link', { name: 'Dodaj zwierzaka' });
    await expect(addAnimalLink).toBeVisible({ timeout: 10000 });
    await addAnimalLink.click();

    // Imię
    await page.getByPlaceholder('np. Nela').fill('Burek');

    // Data urodzenia
    const dateInput = page.locator('input[name="data-urodzenia"]');
    await expect(dateInput).toBeVisible();
    await dateInput.fill('2020-03-11');

    // Gatunek
    await page.getByPlaceholder('np. Pies, Kot').fill('Pies');

    // Rasa
    await page.getByPlaceholder('np. Yorkshire Terrier, Labrador').fill('Mieszaniec');

    // Płeć (wybór z listy rozwijanej)
    await page.getByRole('combobox').selectOption({ label: 'Samiec' });

    // Waga
    await page.getByPlaceholder('np. 3.5').fill('12.5');

    // Numer chipu
    await page.getByPlaceholder('15-cyfrowy numer chipu').fill('123456789012345');

    // --- ZAPIS I WERYFIKACJA ---

    const submitButton = page.getByRole('button', { name: /Wyślij/i });

    await submitButton.click();

    // sprawdz animals
    await page.goto('http://localhost:3000/dashboard/animals');
    
    const successMessage = page.getByText('Burek').first();
    await expect(successMessage).toBeVisible({ timeout: 15000 });

    console.log('Sukces: Zwierzak dodany poprawnie!');

    // Sprawdz dashboard

    await page.getByRole('link', { name: 'Przegląd' }).click();

    await expect(page).toHaveURL(/.*dashboard$/);

    const dashboardElement = page.getByText('Burek').first();
    await expect(dashboardElement).toBeVisible({ timeout: 10000 });

    console.log('Sukces: Zwierzak widoczny na dashboard!');
});