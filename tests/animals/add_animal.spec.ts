import { test, expect } from '@playwright/test';

// Zapisana sesja uzytkownika
test.use({ storageState: 'playwright/.auth/user.json' });

test('Dodawanie zwierzaka - pełny proces', async ({ page }) => {

    await page.goto('/dashboard/animals');
    
    const addAnimalLink = page.getByRole('link', { name: /Dodaj zwierzaka/i });
    
    await expect(addAnimalLink, 'Błąd: Nie znaleziono przycisku dodawania. Sprawdź czy sesja jest aktywna.')
        .toBeVisible({ timeout: 10000 });  
    await addAnimalLink.click();

    await expect(page).toHaveURL('/dashboard/add', { timeout: 10000 });

    await page.getByPlaceholder('np. Nela').fill('Burek');

    const dateInput = page.locator('input[name="data-urodzenia"]');
    await dateInput.fill('2020-03-11');

    await page.getByPlaceholder('np. Pies, Kot').fill('Pies');
    await page.getByPlaceholder('np. Yorkshire Terrier, Labrador').fill('Mieszaniec');

    await page.getByRole('combobox').selectOption({ label: 'Samiec' });

    await page.getByPlaceholder('np. 3.5').fill('12.5');
    await page.getByPlaceholder('15-cyfrowy numer chipu').fill('123456789012345');

    const submitButton = page.getByRole('button', { name: /Wyślij/i });
    await submitButton.click();

    await expect(page).toHaveURL(/\/dashboard\/\d+/);
    
    const animalHeading = page.getByRole('heading', { name: 'Burek', level: 1 });
    await expect(animalHeading).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: 'PetCare' }).first().click();
    
    await expect(page).toHaveURL(/\/dashboard(\/)?$/);
    
    await expect(page.getByText('Burek').first()).toBeVisible({ timeout: 10000 });

    console.log('Sukces: Zwierzak został poprawnie dodany i zweryfikowany na dashboardzie.');
});