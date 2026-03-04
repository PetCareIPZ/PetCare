'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import deleteAnimalHandler from "~/components/dashboard/id/AnimalDeletionHandler";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Animal } from "~/types/animal";

interface DeleteAnimalProps {
  animal: Animal;
}

export default function AnimalDetailContent({ animal }: DeleteAnimalProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Przygotowanie danych do wyświetlenia z zachowaniem bezpieczeństwa typów
  const details: [string, string | number][] = [
    ["Gatunek", animal.species],
    ["Rasa", animal.race],
    ["Płeć", animal.sex],
    ["Data urodzenia", typeof animal.birthDate === 'string' ? animal.birthDate : animal.birthDate.toLocaleDateString("pl-PL")],
    ["Waga", animal.weight ? `${animal.weight} kg` : "-"],
    ["Data dodania", new Date(animal.createdAt).toLocaleDateString("pl-PL")]
  ];

  // Opcjonalne dodanie numeru chipa przy użyciu nullish coalescing ??
  if (animal.chipNumber) {
    details.splice(5, 0, ["Numer Chipa", animal.chipNumber]);
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Nawigacja */}
        <div className="flex justify-between mb-6 text-sm sm:text-base">
          <Link 
            href="/dashboard/animals" 
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium group"
          >
            <ArrowLeft 
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" 
            />
            <span>Powrót</span>
          </Link>

          <Link 
            href={`/dashboard/${animal.petId}/health-card`} 
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium group"
          >
            <span>Karta Zdrowia</span>
            <div className="flex items-center transition-transform duration-300 ease-in-out group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Karta */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row transition hover:shadow-lg">

          {/* Lewa kolumna: zdjęcie */}
          <div className="w-full sm:w-1/2 h-48 sm:h-64 md:h-auto bg-gray-100 relative">
            <Image
              src={animal.imageUrl ?? "/img/placeholder-pet.png"} // Użycie ?? zamiast ||
              alt={animal.petName}
              fill
              className="object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>

          {/* Prawa kolumna: informacje */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{animal.petName}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-600 text-sm">
                {details.map(([label, value]) => (
                  <div key={label} className="flex flex-col">
                    <span className="font-medium text-gray-400">{label}</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Akcje */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link href={`/dashboard/${animal.petId}/edit`} className="flex-1">
                <button className="w-full bg-secondary/80 hover:bg-secondary text-white font-semibold py-2 rounded-xl shadow transition">
                  Edytuj
                </button>
              </Link>
              <button
                onClick={() => setShowConfirm(true)}
                className="flex-1 min-w-[120px] w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl shadow transition"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>

        {/* Modal potwierdzenia */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Potwierdzenie usunięcia</h2>
              <p className="text-gray-600 mb-5">
                Czy na pewno chcesz usunąć zwierzę <strong>{animal.petName}</strong>? Ta operacja nie może być cofnięta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => deleteAnimalHandler(animal.petId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}