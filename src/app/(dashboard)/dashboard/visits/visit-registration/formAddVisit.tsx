"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { funt2 } from "~/components/dashboard/visits/base";
import Icon from "~/components/Icon";
import "@uploadthing/react/styles.css";
import type { Pet, Facility } from "~/types/visits";
import type { Shop } from "~/types/facilities";

// Wyłączamy SSR dla komponentów zależnych od przeglądarki (Mapa i Upload)
const ShopsMapClient = dynamic(() => import("~/components/dashboard/facilities/ShopsMapClient"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-gray-100 animate-pulse rounded-xl" />
});

const UploadButton = dynamic(() => import("src/utils/uploadthing").then(mod => mod.UploadButton), { 
  ssr: false 
});

export default function RegisterVisit() {
  const searchParams = useSearchParams();
  const petIdParam = searchParams.get("petId");

  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [animals, setAnimals] = useState<Pet[]>([]); 
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFacility, setSelectedFacility] = useState<Shop | null>(null);

  useEffect(() => {
    if (petIdParam) setSelectedPetId(parseInt(petIdParam));
  }, [petIdParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facRes, animRes] = await Promise.all([
          fetch("/api/facilities"),
          fetch("/api/animal")
        ]);
        setFacilities(await facRes.json() as Facility[]);
        setAnimals(await animRes.json() as Pet[]);
      } catch (err) {
        console.error("Błąd ładowania danych:", err);
      }
    };
    fetchData();
  }, []);

  const facilityTypes = useMemo(() => 
    Array.from(new Set(facilities.map((f) => f.facilityType))), 
  [facilities]);

  const filteredFacilities = useMemo(() => {
    if (!selectedType) return []; 
    return facilities.filter((f) => f.facilityType === selectedType) as unknown as Shop[];
  }, [facilities, selectedType]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <form action={funt2} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-3">Wybierz zwierzaka</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {animals.map((pet) => (
                <div
                  key={pet.petId}
                  onClick={() => setSelectedPetId(pet.petId)}
                  className={`cursor-pointer p-3 rounded-xl border-2 transition-all flex flex-col items-center
                    ${selectedPetId === pet.petId ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 bg-gray-50"}`}
                >
                  <img src={pet.imageUrl || "/svg/no-image.svg"} alt={pet.petName} className="w-12 h-12 rounded-full mb-2 object-cover" />
                  <span className="font-bold text-sm text-gray-800">{pet.petName}</span>
                </div>
              ))}
            </div>
            <input type="hidden" name="petId" value={selectedPetId ?? ""} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" name="data" className="w-full h-[50px] rounded-lg border px-4" required />
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 h-[50px] rounded-lg border px-4"
                required
              >
                <option value="">Wybierz typ</option>
                {facilityTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              <button type="button" onClick={() => setShowMap(!showMap)} className="w-[50px] h-[50px] border rounded-lg">
                <Icon name={showMap ? "times" : "map"} />
              </button>
            </div>
          </div>

          {showMap && (
            <div className="h-72 rounded-xl overflow-hidden border">
              <ShopsMapClient shops={filteredFacilities} onSelectShop={setSelectedFacility} selectedShopId={selectedFacility?.facilityId} />
              <input type="hidden" name="facilityId" value={selectedFacility?.facilityId ?? ""} />
            </div>
          )}

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Załącznik</label>
            <UploadButton
                endpoint="visitAttachment"
                onClientUploadComplete={(res) => {
                    if (res?.[0]?.ufsUrl) {
                    setAttachmentUrl(res[0].ufsUrl);
                    }
                }}
                onUploadError={(e) => {
                    alert("Błąd: " + e.message);
                }}
                />
            <input type="hidden" name="załączniki" value={attachmentUrl ?? ""} />
          </div>

          <button type="submit" disabled={!selectedPetId} className="bg-primary text-white py-2 px-6 rounded-lg disabled:opacity-50 mt-4">
            Zarejestruj wizytę
          </button>
        </form>
      </div>
    </div>
  );
}