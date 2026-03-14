'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import formAddAnimalHandler from "./formAddAnimalHandler";

const UploadZoneWidget = dynamic(() => import("./uploadZone").then(mod => mod.UploadZoneWidget), { 
  ssr: false,
  loading: () => <div className="h-32 w-full bg-gray-50 border border-dashed rounded-lg animate-pulse" />
});

export function AddAnimalFormWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const labelStyle = "block text-gray-700 font-semibold mb-2";
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition";

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Dodaj zwierzaka</h1>
      </div>

      <form action={formAddAnimalHandler} className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-6 sm:gap-8">
        {!mounted ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-gray-100 rounded-lg w-full" />
            <div className="h-12 bg-gray-100 rounded-lg w-full" />
            <div className="h-32 bg-gray-100 rounded-lg w-full" />
          </div>
        ) : (
          <>
            {/* Sekcja: Imię i Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className={labelStyle}>Imię zwierzaka *</label>
                <input name="imie" type="text" className={inputStyle} placeholder="np. Nela" required />
              </div>
              <div>
                <label className={labelStyle}>Data urodzenia *</label>
                <input name="data-urodzenia" type="date" className={inputStyle} required />
              </div>
            </div>

            {/* Sekcja: Gatunek i Rasa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className={labelStyle}>Gatunek *</label>
                <input name="gatunek" type="text" className={inputStyle} placeholder="np. Pies" required />
              </div>
              <div>
                <label className={labelStyle}>Rasa *</label>
                <input name="rasa" type="text" className={inputStyle} placeholder="np. Labrador" required />
              </div>
            </div>

            {/* Sekcja: Płeć i Waga */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className={labelStyle}>Płeć *</label>
                <select name="plec" className={inputStyle} defaultValue="" required>
                  <option value="" disabled>-- Wybierz płeć --</option>
                  <option value="samiec">Samiec</option>
                  <option value="samica">Samica</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Waga (kg) *</label>
                <input name="waga" type="number" step="0.1" className={inputStyle} placeholder="np. 12.5" required />
              </div>
            </div>

            {/* Sekcja: Chip */}
            <div>
              <label className={labelStyle}>Numer chipu</label>
              <input name="czip" type="text" className={inputStyle} placeholder="Opcjonalny 15-cyfrowy numer" maxLength={15} />
            </div>

            {/* Sekcja: Zdjęcie */}
            <div className="pt-2">
              <label className={labelStyle}>Zdjęcie pupila</label>
              <UploadZoneWidget existingImageUrl="/svg/no-image.svg" />
            </div>

            {/* Przyciski */}
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100 pt-6">
              <Link 
                href="/dashboard" 
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition text-center"
              >
                Anuluj
              </Link>
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-sm"
              >
                Zapisz
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}