'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormEditHandler from "~/components/dashboard/id/edit/formEditHandler";
import { UploadZoneWidget } from "~/components/dashboard/add/uploadZone";
import { CheckCircle2, Loader2 } from "lucide-react";
import { defaultColors } from "~/components/Icon";

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

  // Pobranie koloru paw i przygotowanie wariantu focus
  const primaryColor = defaultColors.paw;
  const focusRingColor = primaryColor.replace('1)', '0.2)');

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

  const labelStyle = "text-xs font-bold text-gray-400 uppercase tracking-wider ml-1";
  const inputBaseStyle = "w-full h-[52px] rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all";

  return (
    <div className="flex items-center justify-center py-8 bg-white min-h-screen font-sans">
      <div className="w-full max-w-3xl px-4">
        
        {/* PEŁNOEKRANOWY KOMUNIKAT SUKCESU */}
        {isSuccess && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-500">
            <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md" />
            <div className="relative z-[10000] bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Zapisano zmiany!</h2>
              <p className="text-gray-500">Dane zostały pomyślnie zaktualizowane. Zaraz nastąpi przekierowanie...</p>
              <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full origin-left" 
                  style={{ 
                    backgroundColor: primaryColor,
                    animation: 'progress 2s linear forwards' 
                  }} 
                />
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
          Edytuj dane zwierzaka
        </h1>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="petId" value={animal.petId} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Imię zwierzaka</label>
                <input
                  name="imie"
                  type="text"
                  className={inputBaseStyle}
                  placeholder="np. Nela"
                  defaultValue={animal.petName}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Data urodzenia</label>
                <input
                  name="data-urodzenia"
                  type="date"
                  className={inputBaseStyle}
                  defaultValue={animal.birthDate}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Gatunek</label>
                <input
                  name="gatunek"
                  type="text"
                  className={inputBaseStyle}
                  placeholder="np. Pies"
                  defaultValue={animal.species}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Rasa</label>
                <input
                  name="rasa"
                  type="text"
                  className={inputBaseStyle}
                  placeholder="np. Labrador"
                  defaultValue={animal.race}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Płeć</label>
                <select
                  name="plec"
                  className={`${inputBaseStyle} appearance-none cursor-pointer`}
                  defaultValue={animal.sex}
                  required
                >
                  <option value="samiec">Samiec</option>
                  <option value="samica">Samica</option>
                  <option value="jednopłciowy">Jednopłciowy</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Waga (kg)</label>
                <input
                  name="waga"
                  type="number"
                  step="0.1"
                  className={inputBaseStyle}
                  placeholder="np. 12.5"
                  defaultValue={animal.weight}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelStyle}>Numer chipu</label>
              <input
                name="czip"
                type="text"
                className={inputBaseStyle}
                placeholder="Opcjonalny 15-cyfrowy numer"
                maxLength={15}
                defaultValue={animal.chipNumber ?? ""}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelStyle}>Zdjęcie profilowe</label>
              <UploadZoneWidget existingImageUrl={animal.imageUrl} />
            </div>

            <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isPending}
                style={{ backgroundColor: primaryColor }}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-bold transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90"
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

      <style jsx>{`
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 4px ${focusRingColor};
          border-color: ${primaryColor};
        }
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}