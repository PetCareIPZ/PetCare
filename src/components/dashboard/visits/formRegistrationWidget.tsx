'use client';

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { funt2 } from "./base";
import Icon, { defaultColors } from "~/components/Icon";
import React from "react";
import type { Pet, Facility, SearchParams } from "~/types/visits";
import type { Shop } from "~/types/facilities";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

const ShopsMapClient = dynamic(() => import("~/components/dashboard/facilities/ShopsMapClient"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-gray-100 animate-pulse rounded-xl" />
});

const UploadButton = dynamic(() => import("src/utils/uploadthing").then(mod => mod.UploadButton), { 
  ssr: false 
});

export default function FormRegistrationWidget({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [animals, setAnimals] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFacility, setSelectedFacility] = useState<Shop | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const params = React.use(searchParams);

  const primaryColor = defaultColors.calendar;
  const lightBg = primaryColor.replace('1)', '0.08)');
  const focusRing = primaryColor.replace('1)', '0.2)');

  useEffect(() => {
    setMounted(true);
    void fetch("/api/facilities").then(res => res.json()).then(data => setFacilities(data as Facility[]));
    void fetch("/api/animal").then(res => res.json()).then(data => setAnimals(data as Pet[]));
  }, []);

  useEffect(() => {
    if (params.petId) setSelectedPetId(parseInt(params.petId));
  }, [params.petId]);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      const result = await funt2(formData);
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/visits");
        router.refresh();
      }, 4000);
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas rejestracji wizyty.");
      setIsPending(false);
    }
  }

  const facilityTypes = useMemo(() => Array.from(new Set(facilities.map(f => f.facilityType))).filter(type => type !== "Sklep Zoologiczny"), [facilities]);
  const filteredFacilities = useMemo(() => {
    if (!selectedType) return [];
    return facilities.filter(f => f.facilityType === selectedType && 
    f.facilityType !== "Sklep Zoologiczny") as unknown as Shop[];
  }, [facilities, selectedType]);

  const labelStyle = "block text-gray-700 font-semibold mb-2";
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition bg-white";

  return (
    <div className="w-full py-8 px-4 font-sans" data-testid="registration-page">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Zarejestruj wizytę</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto overflow-hidden relative">
        
      {isSuccess && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500"
          data-testid="success-modal"
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
          
          <div className="relative bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Wizyta zarejestrowana!
            </h2>
            <p className="text-gray-500">
              Dane zostały zapisane pomyślnie. Zaraz wrócisz do listy wizyt.
            </p>
            <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 animate-progress origin-left" />
            </div>
          </div>
        </div>
      )}

        <div className="p-5 sm:p-8">
          {!mounted ? (
            <div className="flex flex-col gap-8 animate-pulse">
              <div className="h-40 bg-gray-50 rounded-xl w-full" />
              <div className="h-12 bg-gray-50 rounded-xl w-full" />
            </div>
          ) : (
            <form action={handleSubmit} className="flex flex-col gap-8" data-testid="visit-form">
              
              <div>
                <label className={labelStyle}>Wybierz pacjenta *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {animals.map((pet) => (
                    <div
                      key={pet.petId}
                      onClick={() => setSelectedPetId(pet.petId)}
                      data-testid={`pet-tile-${pet.petName}`}
                      style={{ 
                        borderColor: selectedPetId === pet.petId ? primaryColor : '#F3F4F6',
                        backgroundColor: selectedPetId === pet.petId ? lightBg : 'transparent'
                      }}
                      className="cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center hover:border-gray-300"
                    >
                      <img src={pet.imageUrl ?? "/svg/no-image.svg"} alt={pet.petName} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-white shadow-sm" />
                      <span className="font-bold text-sm" style={{ color: selectedPetId === pet.petId ? primaryColor : '#1F2937' }}>{pet.petName}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{pet.species}</span>
                    </div>
                  ))}
                </div>
                <input type="hidden" name="petId" value={selectedPetId ?? ""} required />
              </div>

              <hr className="border-gray-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className={labelStyle}>Data wizyty *</label>
                  <input 
                    type="date" 
                    name="data" 
                    data-testid="input-date"
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

              {showMap && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300" data-testid="map-container">
                  {selectedFacility && (
                    <div 
                      data-testid="selected-facility-info"
                      style={{ backgroundColor: lightBg, borderColor: primaryColor }} 
                      className="border p-4 rounded-xl flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-bold" style={{ color: primaryColor }}>Wybrano: {selectedFacility.name}</p>
                        <p className="text-xs opacity-80" style={{ color: primaryColor }}>{selectedFacility.street}, {selectedFacility.city}</p>
                      </div>
                      <button type="button" onClick={() => setSelectedFacility(null)} style={{ color: primaryColor }}>
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

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Uwagi do wizyty</label>
                <textarea 
                  name="uwagi" 
                  data-testid="textarea-notes"
                  className={`${inputStyle} h-auto min-h-[100px] py-3 resize-none`} 
                  placeholder="np. Powód wizyty, objawy..."
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelStyle}>Załącznik</label>
                <div data-testid="upload-section">
                  <UploadButton
                    endpoint="visitAttachment"
                    appearance={{
                        button: `ut-ready:bg-slate-800 ut-uploading:opacity-50 rounded-xl bg-gray-800 text-sm font-bold h-[52px] w-full transition-all shadow-sm`,
                        container: "w-full",
                        allowedContent: "hidden"
                    }}
                    content={{
                        button({ ready }) { return ready ? "Dodaj dokument" : "Przygotowanie..."; }
                    }}
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.ufsUrl) setAttachmentUrl(res[0].ufsUrl);
                    }}
                  />
                </div>
                <input type="hidden" name="załączniki" value={attachmentUrl ?? ""} />
                {attachmentUrl && <p style={{ color: primaryColor }} className="text-sm font-bold mt-2 flex items-center gap-1">✓ Załącznik został dodany</p>}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
                <Link 
                  href="/dashboard/visits" 
                  data-testid="button-cancel"
                  className="w-full px-10 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition text-center"
                >
                  Anuluj
                </Link>
                <button 
                  type="submit" 
                  data-testid="button-submit"
                  disabled={!selectedPetId || !selectedDate || !selectedFacility || isPending}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Zarejestruj wizytę"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

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