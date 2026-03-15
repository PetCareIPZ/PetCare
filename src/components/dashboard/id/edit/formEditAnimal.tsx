'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormEditHandler from "~/components/dashboard/id/edit/formEditHandler";
import { UploadZoneWidget } from "~/components/dashboard/add/uploadZone";
import { CheckCircle2, Loader2 } from "lucide-react";

type animalData = {
    petId: number;
    userId: string;
    petName: string;
    species: string;
    race: string;
    sex: string;
    birthDate: string;
    weight: string;
    chipNumber: string | null;
    imageUrl: string;
    createdAt: Date | null;
}

export default function EditAnimalFormWidget({animal}: {animal: animalData}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await FormEditHandler(formData);

    if (result?.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/${result.petId}`);
        router.refresh();
      }, 2000);
    } else if (result?.error) {
      alert(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-8 bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-3xl px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
          Edytuj dane zwierzaka
        </h1>

        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 overflow-hidden">
          
          {isSuccess && (
            <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Zapisano zmiany!</h2>
              <p className="text-gray-500 mt-2">Zaraz nastąpi przekierowanie...</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="petId" value={animal.petId} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Imię zwierzaka</label>
                <input
                  name="imie"
                  type="text"
                  className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="np. Nela"
                  defaultValue={animal.petName}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Data urodzenia</label>
                <input
                  name="data-urodzenia"
                  type="date"
                  className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  defaultValue={animal.birthDate}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Gatunek</label>
                <input
                  name="gatunek"
                  type="text"
                  className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  defaultValue={animal.species}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Rasa</label>
                <input
                  name="rasa"
                  type="text"
                  className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  defaultValue={animal.race}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Płeć</label>
                <select
                  name="plec"
                  className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  defaultValue={animal.sex}
                  required
                >
                  <option value="samiec">Samiec</option>
                  <option value="samica">Samica</option>
                  <option value="jednopłciowy">Jednopłciowy</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Waga (kg)</label>
                <input
                  name="waga"
                  type="number"
                  step="0.1"
                  className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  defaultValue={animal.weight}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Numer chipu</label>
              <input
                name="czip"
                type="text"
                className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                maxLength={15}
                defaultValue={animal.chipNumber ?? ""}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Zdjęcie profilowe</label>
              <UploadZoneWidget existingImageUrl={animal.imageUrl} />
            </div>

            <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-gray-50">
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Zapisz zmiany"}
              </button>

              <Link 
                href={`/dashboard/${animal.petId}`} 
                className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition text-center"
              >
                Anuluj
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}