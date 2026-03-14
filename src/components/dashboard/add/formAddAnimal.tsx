'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import formAddAnimalHandler from "./formAddAnimalHandler";
import { defaultColors } from "~/components/Icon";

const UploadZoneWidget = dynamic(() => import("./uploadZone").then(mod => mod.UploadZoneWidget), { 
  ssr: false,
  loading: () => <div className="h-32 w-full bg-gray-50 border border-dashed rounded-lg animate-pulse" />
});

export function AddAnimalFormWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Kolor bazowy pobrany z ikony 'paw'
  const primaryColor = defaultColors.paw;
  // Subtelny kolor dla efektu focus (zmniejszone krycie do 20%)
  const focusRingColor = primaryColor.replace('1)', '0.2)');

  const labelStyle = "block text-gray-700 font-semibold mb-2";
  
  // Styl dla inputów (używamy zmiennej dla koloru focusa)
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition focus:border-transparent";

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Dodaj zwierzaka</h1>
      </div>

      <form action={formAddAnimalHandler} className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-8">
        {!mounted ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-gray-100 rounded-lg w-full" />
            <div className="h-12 bg-gray-100 rounded-lg w-full" />
            <div className="h-32 bg-gray-100 rounded-lg w-full" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>Imię zwierzaka *</label>
                <input 
                  name="imie" 
                  type="text" 
                  className={inputStyle} 
                  style={{'--tw-focus-ring-color': focusRingColor} as any}
                  placeholder="np. Nela" 
                  required 
                />
              </div>
              <div>
                <label className={labelStyle}>Data urodzenia *</label>
                <input name="data-urodzenia" type="date" className={inputStyle} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>Gatunek *</label>
                <input name="gatunek" type="text" className={inputStyle} placeholder="np. Pies" required />
              </div>
              <div>
                <label className={labelStyle}>Rasa *</label>
                <input name="rasa" type="text" className={inputStyle} placeholder="np. Labrador" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div>
              <label className={labelStyle}>Numer chipu</label>
              <input name="czip" type="text" className={inputStyle} placeholder="Opcjonalny 15-cyfrowy numer" maxLength={15} />
            </div>

            <div className="pt-2">
              <label className={labelStyle}>Zdjęcie pupila</label>
              <UploadZoneWidget existingImageUrl="/svg/no-image.svg" />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
              <Link 
                href="/dashboard" 
                className="w-full px-10 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition text-center"
              >
                Anuluj
              </Link>
              <button 
                type="submit" 
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-md shadow-gray-200"
              >
                Zapisz dane
              </button>
            </div>
          </>
        )}
      </form>
      
      {/* Dynamiczny styl dla focusa we wszystkich polach formularza */}
      <style jsx>{`
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 4px ${focusRingColor};
          border-color: ${primaryColor};
        }
      `}</style>
    </div>
  );
}