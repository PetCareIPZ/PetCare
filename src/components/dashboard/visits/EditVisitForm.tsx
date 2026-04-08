'use client';

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { updateVisit, deleteVisit } from "./base";
import Icon, { defaultColors } from "~/components/Icon";
import React from "react";
import type { Pet, Facility, Visit } from "~/types/visits";
import type { Shop } from "~/types/facilities";
import Link from "next/link";
import { CheckCircle2, Loader2, Trash2, ArrowLeft } from "lucide-react";

const ShopsMapClient = dynamic(() => import("~/components/dashboard/facilities/ShopsMapClient"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-gray-100 animate-pulse rounded-xl" />
});

const UploadButton = dynamic(() => import("src/utils/uploadthing").then(mod => mod.UploadButton), { 
  ssr: false 
});

interface EditVisitFormProps {
  initialData: Visit; 
}

export default function EditVisitForm({ initialData }: EditVisitFormProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(initialData.visitAttachment ?? null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [animals, setAnimals] = useState<Pet[]>([]);
  
  const [selectedPetId] = useState<number | null>(initialData.petID ?? null);
  const [selectedFacility, setSelectedFacility] = useState<Shop | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    initialData.visitDate ? new Date(initialData.visitDate).toISOString().slice(0, 16) : ""
  );
  const [selectedType, setSelectedType] = useState<string>(initialData.visitType ?? "");

  const primaryColor = defaultColors.calendar;
  const lightBg = primaryColor.replace('1)', '0.08)');
  const focusRing = primaryColor.replace('1)', '0.2)');

  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      try {
        const [facRes, animRes] = await Promise.all([
          fetch("/api/facilities"),
          fetch("/api/animal")
        ]);

        const facData: Facility[] = await facRes.json();
        const animData: Pet[] = await animRes.json();

        setFacilities(facData);
        setAnimals(animData);

        if (initialData.facilityId) {
            const found = facData.find((f) => f.facilityId === initialData.facilityId);
            if (found) setSelectedFacility(found as unknown as Shop);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    void fetchData();
  }, [initialData]);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      formData.append("visitId", String(initialData.visitID));
      await updateVisit(formData);
      setIsSuccess(true);
      setTimeout(() => {router.push("/dashboard/visits"); router.refresh();}, 3000);
    } catch (error) {
        console.error("Szczegóły błędu zapisu:", error);
      alert("Błąd zapisu");
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVisit(initialData.visitID);
       setIsDeleted(true);
      setTimeout(() => router.push("/dashboard/visits"), 3000);
    } catch (error) {
      alert("Błąd usuwania");
      setIsDeleting(false);
    }
  };

    const facilityTypes = useMemo(() => Array.from(new Set(facilities.map(f => f.facilityType))).filter(type => type !== "Sklep Zoologiczny"), [facilities]);
    const filteredFacilities = useMemo(() => {
      if (!selectedType) return [];
      return facilities.filter(f => f.facilityType === selectedType && 
      f.facilityType !== "Sklep Zoologiczny") as unknown as Shop[];
    }, [facilities, selectedType]);

  const labelStyle = "block text-gray-700 font-semibold mb-2";
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition bg-white";
    return (
    <div className="w-full py-8 px-4 font-sans">
      <div className="max-w-2xl mx-auto mb-6">
        <Link href="/dashboard/visits" className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full font-medium">
          <ArrowLeft size={18} /> Powrót
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto overflow-hidden relative">
       

        <div className="p-5 sm:p-8">
          {!mounted ? (
            <div className="flex flex-col gap-8 animate-pulse">
              <div className="h-40 bg-gray-50 rounded-xl w-full" />
              <div className="h-12 bg-gray-50 rounded-xl w-full" />
            </div>
          ) : (
            <form action={handleSubmit} className="flex flex-col gap-8">
              
              {/* 2. Pacjent - Brak zmiany (tylko podgląd wybranego) */}
              <div>
                <label className={labelStyle}>Pacjent</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {animals.map((pet) => (
                    <div
                      key={pet.petId}
                      style={{ 
                        borderColor: selectedPetId === pet.petId ? primaryColor : '#F3F4F6',
                        backgroundColor: selectedPetId === pet.petId ? lightBg : 'transparent',
                        opacity: selectedPetId === pet.petId ? 1 : 0.4,
                        cursor: 'default'
                      }}
                      className="p-4 rounded-xl border-2 flex flex-col items-center text-center transition-all"
                    >
                      <img src={pet.imageUrl ?? "/svg/no-image.svg"} alt="" className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-white shadow-sm" />
                      <span className="font-bold text-sm" style={{ color: selectedPetId === pet.petId ? primaryColor : '#1F2937' }}>{pet.petName}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{pet.species}</span>
                    </div>
                  ))}
                </div>
                <input type="hidden" name="petId" value={selectedPetId ?? ""} />
                <p className="mt-1 text-xs text-gray-500">Nie można zmienić przypisanego zwierzaka.</p>
              </div>

              <hr className="border-gray-100" />

              {/* Data i Typ z przełącznikiem mapy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className={labelStyle}>Data i godzina wizyty *</label>
                  <input 
                    type="datetime-local" 
                    name="data" 
                    step="60"
                    className={inputStyle} 
                    required 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)} 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelStyle}>Typ placówki *</label>
                  <div className="flex gap-2">
                    <select
                      name="rodzaj_wizyty"
                      data-testid="select-type"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className={`${inputStyle} appearance-none cursor-pointer`}
                      required
                    >
                      <option value="">Wybierz...</option>
                      {facilityTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      data-testid="button-toggle-map"
                      onClick={() => setShowMap(!showMap)}
                      style={{ 
                        backgroundColor: showMap ? primaryColor : 'white',
                        borderColor: showMap ? primaryColor : '#D1D5DB',
                        color: showMap ? 'white' : '#6B7280'
                      }}
                      className="shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-lg border-2 transition-all shadow-sm"
                    >
                      <Icon name={showMap ? "xmark" : "map"} color={showMap ? "white" : undefined} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mapa i Wybrana Placówka */}
              {showMap && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  {selectedFacility && (
                    <div 
                      style={{ backgroundColor: lightBg, borderColor: primaryColor }} 
                      className="border p-4 rounded-xl flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <Icon name="xmark" color={primaryColor} />
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: primaryColor }}>Wybrano: {selectedFacility.name}</p>
                          <p className="text-xs opacity-80" style={{ color: primaryColor }}>{selectedFacility.street}, {selectedFacility.city}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setSelectedFacility(null)}>
                        <Icon name="xmark" color={primaryColor} />
                      </button>
                    </div>
                  )}

                  <div className="h-72 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
                    <ShopsMapClient shops={filteredFacilities} onSelectShop={(f) => setSelectedFacility(f)} selectedShopId={selectedFacility?.facilityId} />
                  </div>
                  <input type="hidden" name="facilityId" value={selectedFacility?.facilityId ?? ""} />
                </div>
              )}

              <div>
                <label className={labelStyle}>Uwagi do wizyty</label>
                <textarea 
                  name="uwagi" 
                  defaultValue={initialData.visitNote ?? ""} 
                  className={`${inputStyle} h-auto min-h-[100px] py-3 resize-none`} 
                  placeholder="np. Powód wizyty, objawy..."
                />
              </div>

              {/* Załącznik */}
              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Załącznik</label>
                <UploadButton
                  endpoint="visitAttachment"
                  appearance={{
                    button: `ut-ready:bg-slate-800 ut-uploading:opacity-50 rounded-xl bg-gray-800 text-sm font-bold h-[52px] w-full transition-all shadow-sm`,
                    container: "w-full",
                    allowedContent: "hidden"
                  }}
                  content={{
                    button({ ready }) { return ready ? (attachmentUrl ? "Zmień dokument" : "Dodaj dokument") : "Przygotowanie..."; }
                  }}
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.ufsUrl) setAttachmentUrl(res[0].ufsUrl);
                  }}
                />
                <input type="hidden" name="załączniki" value={attachmentUrl ?? ""} />
                {attachmentUrl && <p style={{ color: primaryColor }} className="text-sm font-bold mt-2 flex items-center gap-1">✓ Dokument dodany</p>}
              </div>

              {/* 3. Przyciski: Usuń wizytę (lewa) i Zapisz (prawa). Bez Anuluj. */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8">
                <button 
                  type="button" 
                  onClick={() => setShowConfirm(true)}
                  className="w-full sm:w-auto px-8 py-4 text-red-500 font-bold hover:bg-red-50 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Usuń wizytę
                </button>

                <button 
                  type="submit" 
                  disabled={isPending}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full sm:w-auto text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 min-w-[220px]"
                >
                  {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Zapisz zmiany"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Modal Potwierdzenia */}
      {showConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Na pewno?</h2>
                        <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
                            Ta wizyta zostanie trwale usunięta. Czy chcesz kontynuować?
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

             {/* Ekran sukcesu z paskiem postępu */}
        {isSuccess && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center animate-in fade-in duration-500">
            <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md" />
            <div className="relative z-[100002] bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sukces!</h2>
              <p className="text-gray-500">Dane zostały zapisane pomyślnie. Zaraz nastąpi przekierowanie...</p>
              <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full origin-left" 
                  style={{ 
                    backgroundColor: primaryColor,
                    animation: 'progress 4s linear forwards' 
                  }} 
                />
              </div>
            </div>
          </div>
        )} 

        {isDeleted && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />
                    <div className="relative bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4 animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <CheckCircle2 className="w-12 h-12 animate-bounce" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Usunięto!</h2>
                        <p className="text-gray-500">Lek został pomyślnie usunięty. Zaraz nastąpi przekierowanie...</p>
                        
                        {/* Pasek postępu - wizualnie informuje użytkownika ile potrwa czekanie */}
                        <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                             <div 
                                className="h-full origin-left bg-green-500" 
                                style={{ animation: 'progress 5s linear forwards' }} 
                             />
                        </div>
                    </div>
                </div>
            )}

      <style jsx>{`
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 4px ${focusRing};
          border-color: ${primaryColor} !important;
        }
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </div>
  );
}