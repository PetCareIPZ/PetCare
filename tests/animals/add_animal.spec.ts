import { test, expect } from '@playwright/test';

// Korzystamy z zapisanej sesji użytkownika (Global Setup)
test.use({ storageState: 'playwright/.auth/user.json' });

test('Dodawanie zwierzaka - pełny proces', async ({ page }) => {
  
  // 1. Nawigacja do listy zwierząt
  await page.goto('/dashboard/animals');

  // 2. Kliknięcie w przycisk dodawania
  // Regex /i zapewnia odporność na wielkość liter i dodatkowe znaki (np. "+")
  const addAnimalLink = page.getByRole('link', { name: /Dodaj zwierzaka/i });
  
  // Własny komunikat błędu ułatwia debugowanie w raportach
  await expect(addAnimalLink, 'Błąd: Nie znaleziono przycisku dodawania. Sprawdź czy sesja jest aktywna.')
    .toBeVisible({ timeout: 10000 });
  
  await addAnimalLink.click();

  // Czekamy, aż router aplikacji faktycznie przejdzie na stronę formularza
  await expect(page).toHaveURL('/dashboard/add', { timeout: 10000 });

  // 3. Wypełnianie formularza danych zwierzaka
  // Używamy placeholderów zgodnie z Twoim UI
  await page.getByPlaceholder('np. Nela').fill('Burek');

  // Pole typu date wymaga formatu YYYY-MM-DD
  const dateInput = page.locator('input[name="data-urodzenia"]');
  await dateInput.fill('2020-03-11');

  await page.getByPlaceholder('np. Pies, Kot').fill('Pies');
  await page.getByPlaceholder('np. Yorkshire Terrier, Labrador').fill('Mieszaniec');

  // Wybór z listy rozwijanej (Combobox / Select)
  await page.getByRole('combobox').selectOption({ label: 'Samiec' });

  await page.getByPlaceholder('np. 3.5').fill('12.5');
  await page.getByPlaceholder('15-cyfrowy numer chipu').fill('123456789012345');

  // 4. Zapisanie danych
  const submitButton = page.getByRole('button', { name: /Wyślij/i });
  await submitButton.click();

  // 5. Weryfikacja przekierowania na kartę zwierzaka
  // Aplikacja przechodzi na /dashboard/[ID], więc używamy regex \d+ (cyfry)
  await expect(page).toHaveURL(/\/dashboard\/\d+/);
  
  // Sprawdzamy, czy imię zwierzaka pojawia się jako główny nagłówek strony
  const animalHeading = page.getByRole('heading', { name: 'Burek', level: 1 });
  await expect(animalHeading).toBeVisible({ timeout: 15000 });

  // 6. Powrót na główny dashboard i ostateczne sprawdzenie
  // Kliknięcie w logo/nazwę aplikacji zazwyczaj prowadzi do strony głównej panelu
  await page.getByRole('link', { name: 'PetCare' }).first().click();
  
  // Sprawdzamy czy URL to /dashboard lub /dashboard/
  await expect(page).toHaveURL(/\/dashboard(\/)?$/);
  
  // Weryfikujemy, czy "Burek" widnieje w sekcji "Twoje zwierzęta" na dashboardzie
  await expect(page.getByText('Burek').first()).toBeVisible({ timeout: 10000 });

  console.log('Sukces: Zwierzak został poprawnie dodany i zweryfikowany na dashboardzie.');
});