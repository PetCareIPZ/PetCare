import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('Pełny proces dodawania wizyty', async ({ page }) => {
    const animalName = 'BurekTest';
  
    await page.goto('/dashboard/visits');

    const addVisitLink = page.getByRole('link', { name: /Nowa wizyta|Zarejestruj wizyt/i });
    await expect(addVisitLink).toBeVisible({ timeout: 10000 });
    await addVisitLink.click();
    
    await expect(page).toHaveURL(/.*visit-registration/);

    const petTile = page.getByTestId(`pet-tile-${animalName}`).first();
    await petTile.click();

    await page.getByTestId('input-date').fill('2026-03-20');

    await page.getByTestId('select-type').selectOption('Groomer');
    await page.getByTestId('button-toggle-map').click();

    const leafletMap = page.locator('div').filter({ hasText: /^\+− Leaflet \| © OpenStreetMap$/ }).nth(2);
    await expect(leafletMap).toBeVisible({ timeout: 10000 });

    const marker = leafletMap.getByRole('button', { name: 'Marker' }).nth(1);
    
    await expect(marker).toBeVisible({ timeout: 7000 });

    await marker.click({ force: true });

    await expect(page.getByTestId('selected-facility-info')).toBeVisible();

    await page.getByTestId('textarea-notes').fill('Testowa uwaga automatyczna');

    const submitBtn = page.getByTestId('button-submit');
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    await expect(page.getByTestId('success-modal')).toBeVisible();
    
    await expect(page).toHaveURL(/\/dashboard\/visits/, { timeout: 10000 });
    
    await page.reload(); 
    await expect(page.getByText(animalName).first()).toBeVisible({ timeout: 15000 });
});