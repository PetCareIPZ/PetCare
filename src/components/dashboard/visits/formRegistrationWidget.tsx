"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { funt2 } from "./base";
import Icon from "~/components/Icon";
import React from "react";
import type { Pet, Facility, SearchParams } from "~/types/visits";
import type { Shop } from "~/types/facilities";

// Dynamiczny import komponentów klienckich
const ShopsMapClient = dynamic(() => import("~/components/dashboard/facilities/ShopsMapClient"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-gray-100 animate-pulse rounded-xl" />
});

const UploadButton = dynamic(() => import("src/utils/uploadthing").then(mod => mod.UploadButton), { 
  ssr: false 
});

export default function FormRegistrationWidget({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [mounted, setMounted] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [animals, setAnimals] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFacility, setSelectedFacility] = useState<Shop | null>(null);

  const params = React.use(searchParams);

  useEffect(() => {
    setMounted(true);
    
    void fetch("/api/facilities")
      .then((res) => res.json())
      .then((data) => setFacilities(data as Facility[]))
      .catch((err) => console.error("Błąd ładowania placówek:", err));

    void fetch("/api/animal")
      .then((res) => res.json())
      .then((data) => setAnimals(data as Pet[]))
      .catch((err) => console.error("Błąd ładowania zwierząt", err));
  }, []);

  useEffect(() => {
    if (params.petId) {
      setSelectedPetId(parseInt(params.petId));
    }
  }, [params.petId]);

  const facilityTypes = useMemo(() => {
    return Array.from(new Set(facilities.map((f) => f.facilityType)));
  }, [facilities]);

  const filteredFacilities = useMemo(() => {
    if (!selectedType) return [];
    return facilities.filter((f) => f.facilityType === selectedType) as unknown as Shop[];
  }, [facilities, selectedType]);

  const handleSelectFacility = (facility: Shop) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Zarejestruj wizytę</h2>

        {!mounted ? (
          /* SKELETON: Identyczny wrapper jak formularz, aby sidebar nie znikał */
          <div className="flex flex-col gap-6 animate-pulse">
            <div className="h-32 bg-gray-50 rounded-xl w-full" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-gray-50 rounded-xl" />
              <div className="h-14 bg-gray-50 rounded-xl" />
            </div>
            <div className="h-20 bg-gray-50 rounded-xl w-full" />
            <div className="h-12 bg-gray-200 rounded-xl w-1/3 self-end" />
          </div>
        ) : (
          <form action={funt2} className="flex flex-col gap-6 animate-in fade-in duration-300">
            {/* Wybór zwierzaka */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Wybierz zwierzaka</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {animals.map((pet) => (
                  <div
                    key={pet.petId}
                    onClick={() => setSelectedPetId(pet.petId)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                      selectedPetId === pet.petId ? "border-blue-500 bg-blue-50 ring-4 ring-blue-50" : "border-gray-100 bg-white hover:border-blue-200"
                    }`}
                  >
                    <img src={pet.imageUrl ?? "/svg/no-image.svg"} alt={pet.petName} className="w-14 h-14 rounded-full mb-3 object-cover shadow-sm" />
                    <span className={`font-bold text-sm ${selectedPetId === pet.petId ? "text-blue-700" : "text-gray-700"}`}>{pet.petName}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">{pet.species}</span>
                  </div>
                ))}
              </div>
              <input type="hidden" name="petId" value={selectedPetId ?? ""} />
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Data wizyty</label>
                <input type="date" name="data" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Typ placówki</label>
                <div className="flex gap-2">
                  <select
                    name="rodzaj_wizyty"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="flex-1 h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Wybierz...</option>
                    {facilityTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowMap(!showMap)}
                    className={`shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-xl border-2 transition-colors ${
                      showMap ? "bg-blue-600 border-blue-600 text-white" : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Icon name={showMap ? "times" : "map"} />
                  </button>
                </div>
              </div>
            </div>

            {showMap && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                {selectedFacility && (
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-blue-800">Wybrano: {selectedFacility.name}</p>
                      <p className="text-xs text-blue-600">{selectedFacility.street}, {selectedFacility.city}</p>
                    </div>
                    <button type="button" onClick={() => setSelectedFacility(null)} className="text-blue-400 hover:text-blue-600">
                      <Icon name="times" />
                    </button>
                  </div>
                )}
                <div className="h-72 rounded-xl overflow-hidden border-2 border-blue-50 shadow-sm">
                  <ShopsMapClient shops={filteredFacilities} onSelectShop={handleSelectFacility} selectedShopId={selectedFacility?.facilityId} />
                </div>
                <input type="hidden" name="facilityId" value={selectedFacility?.facilityId ?? ""} />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Uwagi</label>
              <input type="text" name="uwagi" className="w-full h-[52px] rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Opcjonalne uwagi" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Załącznik</label>
              <UploadButton
                endpoint="visitAttachment"
                appearance={{
                    button: "ut-ready:bg-blue-600 ut-uploading:cursor-not-allowed rounded-xl bg-slate-800 text-sm font-semibold h-[52px] w-full transition-all",
                    container: "w-full",
                    allowedContent: "text-[10px] text-gray-400 mt-1 uppercase"
                }}
                content={{
                    button({ ready }) { return ready ? "Dodaj plik" : "Inicjalizacja..."; }
                }}
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.ufsUrl) {
                    setAttachmentUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(e) => alert("Błąd uploadu: " + e.message)}
              />
              <input type="hidden" name="załączniki" value={attachmentUrl ?? ""} />
              {attachmentUrl && <span className="text-xs text-green-600 font-medium ml-1">✓ Załącznik dodany</span>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="submit" 
                disabled={!selectedPetId} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition disabled:opacity-30 shadow-lg shadow-blue-100"
              >
                Zarejestruj wizytę
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}