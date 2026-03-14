'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import formAddAnimalHandler from "./formAddAnimalHandler";

const UploadZoneWidget = dynamic(() => import("./uploadZone").then(mod => mod.UploadZoneWidget), { 
  ssr: false,
  loading: () => <div className="h-32 w-full bg-gray-50 border-2 border-dashed rounded-xl animate-pulse" />
});

export function AddAnimalFormWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // WAŻNE: Renderujemy ZAWSZE ten sam kontener zewnętrzny. 
  // Sidebar znikał, bo React myślał, że cała sekcja dzieci (children) została usunięta.
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Dodaj zwierzaka
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 min-h-[500px]">
          {!mounted ? (
            /* To widzi SERWER i przeglądarka przez pierwszą milisekundę */
            <div className="space-y-6 animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-50 rounded-xl" />
                ))}
              </div>
              <div className="h-32 bg-gray-50 rounded-xl w-full" />
            </div>
          ) : (
            /* To pojawia się po "nawodnieniu" (hydration) */
            <form action={formAddAnimalHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Imię zwierzaka</label>
                  <input name="imie" type="text" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="np. Nela" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Data urodzenia</label>
                  <input name="data-urodzenia" type="date" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Gatunek</label>
                  <input name="gatunek" type="text" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="np. Pies" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Rasa</label>
                  <input name="rasa" type="text" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="np. Labrador" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Płeć</label>
                  <select name="plec" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" required>
                    <option value="">Wybierz płeć</option>
                    <option value="samiec">Samiec</option>
                    <option value="samica">Samica</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Waga (kg)</label>
                  <input name="waga" type="number" step="0.1" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Numer chipu</label>
                <input name="czip" type="text" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none" maxLength={15} />
              </div>

              <UploadZoneWidget existingImageUrl="/svg/no-image.svg" />

              <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6">
                <button type="submit" className="px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg">
                  Zapisz dane
                </button>
                <Link href="/dashboard" className="px-10 py-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-center font-semibold">
                  Anuluj
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}