import { funt2 } from "./base"; 
export default async function formularz_w() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Nowa Wizyta</h2>
      <form action={funt2}name='formularz' className="flex flex-col -4">
        
        <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Podaj id Zwierzaka!</label>
        <input type='number' name='idzwierzaka' className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"  />
        </div>

        <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Podaj date wizyty</label>
        <input type='date' name='data' className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        
        <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Podaj typ wizyty</label>
        <input type='text' name='rodzaj_wizyty' className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
        </div>
        
        <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Uwagi</label>
        <input type='text' name='uwagi' className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
        </div>

        <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Załącznik</label>
        <input type='text' name='załączniki' className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"/>
        </div>
        


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