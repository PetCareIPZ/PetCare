import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('Pełny proces dodawania wizyty', async ({ page }) => {
    const animalName = 'a'; 
  
    await page.goto('/dashboard/visits');

    const addVisitLink = page.getByRole('link', { name: /Nowa wizyta|Zarejestruj wizyt/i });
    
    await expect(addVisitLink, 'Link "Nowa wizyta" nie jest widoczny. Czy użytkownik jest zalogowany?')
        .toBeVisible({ timeout: 10000 });
    
    await addVisitLink.click();
    
    await expect(page).toHaveURL(/.*visit-registration/);

    await page.getByText(animalName, { exact: true }).first().click();

    await page.locator('input[name="data"]').fill('2026-03-20');

    await page.getByRole('combobox').selectOption({ label: 'Groomer' });
    await page.getByPlaceholder(/Opcjonalne uwagi/i).fill('Testowa uwaga automatyczna');

    await page.getByRole('button', { name: /Zarejestruj wizytę/i }).click();

    await expect(page).toHaveURL(/.*dashboard\/visits/);
    
    await page.reload(); 
    await expect(page.getByText(animalName).first()).toBeVisible({ timeout: 15000 });
});