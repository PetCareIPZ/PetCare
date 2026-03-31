import { test, expect } from '@playwright/test';

// Zapisana sesja użytkownika
test.use({ storageState: 'playwright/.auth/user.json' });

test('Dodawanie zwierzaka - pełny proces (używając data-testid)', async ({ page }) => {

    await page.goto('/dashboard/animals');

    const pet_name = 'BurekTest';
    
    const addAnimalButton = page.getByRole('link', { name: '+ Dodaj zwierzaka' })
    
    await expect(addAnimalButton, 'Błąd: Nie znaleziono przycisku dodawania. Sprawdź czy sesja jest aktywna.')
        .toBeVisible({ timeout: 10000 });  
    await addAnimalButton.click();

    await expect(page).toHaveURL('/dashboard/add', { timeout: 10000 });
    await expect(page.getByTestId('add-animal-form')).toBeVisible();
    
    await page.getByTestId('input-name').fill(pet_name);
    await page.getByTestId('input-birthdate').fill('2020-03-15');
    await page.getByTestId('input-species').fill('Pies');
    await page.getByTestId('input-breed').fill('Mieszaniec');

    await page.getByTestId('select-gender').selectOption('samiec');

    await page.getByTestId('input-weight').fill('12.5');
    await page.getByTestId('input-chip').fill('123456789012345');

    await expect(page.getByTestId('upload-zone')).toBeVisible();

    const submitButton = page.getByTestId('button-submit');
    await submitButton.click();

    await expect(page.getByTestId('success-modal')).toBeVisible({ timeout: 5000 });

    // await expect(page).toHaveURL(/\/dashboard\/\d+/, { timeout: 15000 });
    
    const animalHeading = page.getByRole('heading', { name: pet_name });
    await expect(animalHeading).toHaveText(pet_name, { timeout: 15000 });

    await page.getByRole('heading', { name: pet_name }).click();
    
    // await expect(page).toHaveURL(/\/dashboard(\/)?$/);
    
    await expect(page.getByRole('link', { name: 'Zwierzaki' })).toBeVisible({ timeout: 15000 });

    console.log('Sukces: Zwierzak został poprawnie dodany i zweryfikowany.');
});