'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import deleteAnimalHandler from "~/components/dashboard/id/AnimalDeletionHandler";
import { ArrowLeft, ArrowRight, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import type { Animal } from "~/types/animal";
import { useRouter } from "next/navigation";

export default function AnimalDetailContent({ animal }: { animal: Animal }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteAnimalHandler(animal.petId);

    if (result?.success) {
      setIsDeleted(true);
      
      setTimeout(() => {
        router.replace("/dashboard/animals");
      }, 4000);
    } else {
      alert(result?.error || "Wystąpił nieoczekiwany błąd");
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-gray-50" />;

  if (isDeleted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 font-sans">
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
            <CheckCircle2 className="w-12 h-12 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Usunięto!</h2>
          <p className="text-gray-500">
            Zwierzę <strong>{animal.petName}</strong> zostało pomyślnie usunięte. Zaraz wrócisz do listy...
          </p>
        </div>
      </div>
    );
  }

  const details: [string, string | number][] = [
    ["Gatunek", animal.species],
    ["Rasa", animal.race],
    ["Płeć", animal.sex],
    ["Data urodzenia", new Date(animal.birthDate).toLocaleDateString("pl-PL")],
    ["Waga", animal.weight ? `${animal.weight} kg` : "-"],
    ["Data dodania", animal.createdAt ? new Date(animal.createdAt).toLocaleDateString("pl-PL") : ""]
  ];

  if (animal.chipNumber) {
    details.splice(5, 0, ["Numer Chipa", animal.chipNumber]);
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4">

        {/* Nawigacja */}
        <div className="flex justify-between mb-6">
          <Link href="/dashboard/animals" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Powrót</span>
          </Link>

          <Link href={`/dashboard/${animal.petId}/health-card`} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium group">
            <span>Karta Zdrowia</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Karta Informacyjna */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
          <div className="w-full md:w-1/2 h-72 md:h-auto relative bg-gray-100">
            <Image
              src={animal.imageUrl ?? "/img/placeholder-pet.png"}
              alt={animal.petName}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{animal.petName}</h1>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {details.map(([label, value]) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</span>
                    <span className="font-semibold text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <Link href={`/dashboard/${animal.petId}/edit`} className="flex-1">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition active:scale-95 shadow-lg shadow-blue-100">
                  Edytuj dane
                </button>
              </Link>
              <button
                onClick={() => setShowConfirm(true)}
                className="flex-1 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-500 font-bold py-4 rounded-2xl transition active:scale-95"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>

        {/* Modal Potwierdzenia */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Na pewno?</h2>
              <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
                Usunięcie zwierzaka <strong>{animal.petName}</strong> jest trwałe i spowoduje usunięcie wszystkich powiązanych danych.
              </p>
              
              <div className="flex gap-3">
                <button
                  disabled={isDeleting}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition disabled:opacity-50"
                >
                  Anuluj
                </button>
                <button
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-100 disabled:opacity-50 flex items-center justify-center"
                >
                  {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Usuń"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}