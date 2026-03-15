'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import addAnimalFormHandler from "./formAddAnimalHandler";
import { defaultColors } from "~/components/Icon";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

const UploadZoneWidget = dynamic(() => import("./uploadZone").then(mod => mod.UploadZoneWidget), { 
  ssr: false,
  loading: () => <div className="h-32 w-full bg-gray-50 border border-dashed rounded-lg animate-pulse" />
});

export function AddAnimalFormWidget() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryColor = defaultColors.paw;
  const focusRingColor = primaryColor.replace('1)', '0.2)');

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await addAnimalFormHandler(formData);

    if (result?.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/${result.petId}`);
      }, 2000);
    } else {
      alert(result?.error || "Wystąpił błąd");
      setIsPending(false);
    }
  }

  const labelStyle = "block text-gray-700 font-semibold mb-2";
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition focus:border-transparent";

  return (
    <div className="w-full py-8 px-4">
      {isSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-500">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md" />
          <div className="relative z-[10000] bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-sans">Dodano zwierzaka!</h2>
            <p className="text-gray-500 font-sans">
              Nowy profil został utworzony. Zaraz nastąpi przekierowanie...
            </p>
            <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 origin-left" 
                style={{ animation: 'progress 2s linear forwards' }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Dodaj zwierzaka</h1>
      </div>

      <form action={handleSubmit} className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-8">
        {!mounted ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-gray-100 rounded-lg w-full" />
            <div className="h-32 bg-gray-100 rounded-lg w-full" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              <div>
                <label className={labelStyle}>Imię zwierzaka *</label>
                <input name="imie" type="text" className={inputStyle} placeholder="np. Nela" required />
              </div>
              <div>
                <label className={labelStyle}>Data urodzenia *</label>
                <input name="data-urodzenia" type="date" className={inputStyle} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              <div>
                <label className={labelStyle}>Gatunek *</label>
                <input name="gatunek" type="text" className={inputStyle} placeholder="np. Pies" required />
              </div>
              <div>
                <label className={labelStyle}>Rasa *</label>
                <input name="rasa" type="text" className={inputStyle} placeholder="np. Labrador" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
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

            <div className="font-sans">
              <label className={labelStyle}>Numer chipu</label>
              <input name="czip" type="text" className={inputStyle} placeholder="Opcjonalny 15-cyfrowy numer" maxLength={15} />
            </div>

            <div className="pt-2 font-sans">
              <label className={labelStyle}>Zdjęcie pupila</label>
              <UploadZoneWidget existingImageUrl="/svg/no-image.svg" />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-8 font-sans">
              <Link 
                href="/dashboard" 
                className="w-full px-10 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition text-center"
              >
                Anuluj
              </Link>
              <button 
                type="submit" 
                disabled={isPending}
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Zapisz dane"}
              </button>
            </div>
          </>
        )}
      </form>
      
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