"use client";

import { funt2 } from "./base";

import "../../../../../styles/globals.css"

export default function FormularzW() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Nowa Wizyta
        </h2>

        <form action={funt2} name="formularz" className="flex flex-col gap-4">
          {/* ID zwierzaka */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">ID Zwierzaka</label>
            <input
              type="number"
              name="idzwierzaka"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Data wizyty */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Data wizyty</label>
            <input
              type="date"
              name="data"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Typ wizyty */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Typ wizyty</label>
            <input
              type="text"
              name="rodzaj_wizyty"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Kontrola, Szczepienie"
              required
            />
          </div>

          {/* Uwagi */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Uwagi</label>
            <input
              type="text"
              name="uwagi"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Opcjonalne uwagi"
            />
          </div>

          {/* Załącznik */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Załącznik</label>
            <input
              type="text"
              name="załączniki"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Link lub plik"
            />
          </div>

          {/* Przyciski */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Zarejestruj wizytę
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
