import { funt2 } from "./base"; 
export default async function formularz_w() {
  return (
    <div>
      <form action={funt2}name='formularz'>
        <label>Podaj id Zwierzaka!</label>
        <input type='number' name='idzwierzaka'  />
        <label>Podaj date wizyty</label>
        <input type='date' name='data'  />
        <label>Podaj typ wizyty</label>
        <input type='text' name='rodzaj_wizyty' />
        <label>Uwagi</label>
        <input type='text' name='uwagi' />
        <label>Załącznik</label>
        <input type='text' name='załączniki'/>
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded mt-4"
        >
          Zarejestruj wizytę w bazie
        </button>
      </form>
    </div>
  );
}