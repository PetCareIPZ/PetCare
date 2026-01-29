'use client';
import Link from "next/link";
import formHandler from "./formHandler";
import { UploadZoneWidget } from "./uploadZone";

export function AddAnimalFormWidget() {
  return (
    <div className="flex items-center justify-center py-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
          Formularz dodania zwierzaka
        </h1>

        <form
          action={formHandler}
          className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6 transition hover:shadow-lg"
        >
          {/* Imię */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imię zwierzaka
            </label>
            <input
              name="imie"
              type="text"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="np. Nela"
              required
            />
          </div>

          {/* Data urodzenia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data urodzenia
            </label>
            <input
              name="data-urodzenia"
              type="date"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Gatunek */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gatunek
            </label>
            <input
              name="gatunek"
              type="text"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="np. Pies, Kot"
              required
            />
          </div>

          {/* Rasa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rasa
            </label>
            <input
              name="rasa"
              type="text"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="np. Yorkshire Terrier, Labrador"
              required
            />
          </div>

          {/* Płeć */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Płeć
            </label>
            <select
              name="plec"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Wybierz płeć</option>
              <option value="samiec">Samiec</option>
              <option value="samica">Samica</option>
              <option value="jednopłciowy">Jednopłciowy</option>
            </select>
          </div>

          {/* Waga */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waga (kg)
            </label>
            <input
              name="waga"
              type="number"
              min="0.1"
              step="0.1"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="np. 3.5"
              required
            />
          </div>

          {/* Numer chipu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numer chipu
            </label>
            <input
              name="czip"
              type="text"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="15-cyfrowy numer chipu"
              maxLength={15}
              required
            />
          </div>

          {/* Upload zdjęcia */}
          <UploadZoneWidget existingImageUrl="/svg/no-image.svg" />

          {/* Akcje */}
          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition shadow"
            >
              Wyślij
            </button>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Odrzuć
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
