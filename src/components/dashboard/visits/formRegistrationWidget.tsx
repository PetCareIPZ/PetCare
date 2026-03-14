'use client';

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { funt2 } from "./base";
import Icon, { defaultColors } from "~/components/Icon";
import React from "react";
import type { Pet, Facility, SearchParams } from "~/types/visits";
import type { Shop } from "~/types/facilities";
import Link from "next/link";

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

  const facilityTypes = useMemo(() => Array.from(new Set(facilities.map(f => f.facilityType))), [facilities]);
  const filteredFacilities = useMemo(() => {
    if (!selectedType) return [];
    return facilities.filter(f => f.facilityType === selectedType) as unknown as Shop[];
  }, [facilities, selectedType]);

  const labelStyle = "block text-gray-700 font-semibold mb-2";
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition bg-white";

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Zarejestruj wizytę</h1>
      </div>

      <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto">
        {!mounted ? (
          <div className="flex flex-col gap-8 animate-pulse">
            <div className="h-40 bg-gray-50 rounded-xl w-full" />
            <div className="h-12 bg-gray-50 rounded-xl w-full" />
          </div>
        ) : (
          <form action={funt2} className="flex flex-col gap-8">
            
            {/* Wybór zwierzaka */}
            <div>
              <label className={labelStyle}>Wybierz pacjenta *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {animals.map((pet) => (
                  <div
                    key={pet.petId}
                    onClick={() => setSelectedPetId(pet.petId)}
                    style={{ 
                      borderColor: selectedPetId === pet.petId ? primaryColor : '#F3F4F6',
                      backgroundColor: selectedPetId === pet.petId ? lightBg : 'transparent'
                    }}
                    className="cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center"
                  >
                    <img src={pet.imageUrl ?? "/svg/no-image.svg"} alt={pet.petName} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-white shadow-sm" />
                    <span className="font-bold" style={{ color: selectedPetId === pet.petId ? primaryColor : '#1F2937' }}>{pet.petName}</span>
                    <span className="text-xs text-gray-500">{pet.species}</span>
                  </div>
                ))}
              </div>
              <input type="hidden" name="petId" value={selectedPetId ?? ""} required />
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>Data wizyty *</label>
                <input type="date" name="data" className={inputStyle} required />
              </div>

              <div>
                <label className={labelStyle}>Typ placówki *</label>
                <div className="flex gap-2">
                  <select
                    name="rodzaj_wizyty"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className={inputStyle}
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
                    style={{ 
                      backgroundColor: showMap ? primaryColor : 'white',
                      borderColor: showMap ? primaryColor : '#D1D5DB',
                      color: showMap ? 'white' : '#6B7280'
                    }}
                    className="shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-lg border-2 transition-all"
                  >
                    <Icon name={showMap ? "xmark" : "map"} color={showMap ? "white" : undefined} />
                  </button>
                </div>
              </div>
            </div>

            {showMap && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                {selectedFacility && (
                  <div style={{ backgroundColor: lightBg, borderColor: primaryColor }} className="border p-4 rounded-xl flex justify-between items-center">
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
                  <ShopsMapClient shops={filteredFacilities} onSelectShop={(f) => setSelectedFacility(f as Shop)} selectedShopId={selectedFacility?.facilityId} />
                </div>
                <input type="hidden" name="facilityId" value={selectedFacility?.facilityId ?? ""} />
              </div>
            )}

            <div>
              <label className={labelStyle}>Uwagi do wizyty</label>
              <textarea 
                name="uwagi" 
                className={`${inputStyle} h-auto min-h-[120px] py-3`} 
                placeholder="np. Powód wizyty..."
              ></textarea>
            </div>

            <div>
              <label className={labelStyle}>Załącznik</label>
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
              <input type="hidden" name="załączniki" value={attachmentUrl ?? ""} />
              {attachmentUrl && <p style={{ color: primaryColor }} className="text-sm font-bold mt-2 flex items-center gap-1">✓ Załącznik został dodany</p>}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
              <Link 
                href="/dashboard/visits" 
                className="w-full px-10 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition text-center"
              >
                Anuluj
              </Link>
              <button 
                type="submit" 
                disabled={!selectedPetId}
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Zarejestruj wizytę
              </button>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 4px ${focusRing};
          border-color: ${primaryColor} !important;
        }
      `}</style>
    </div>
  );
}