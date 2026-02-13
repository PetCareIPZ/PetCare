"use client";

import { funt2 } from "./base";
import { useState,useEffect } from "react";
import { UploadButton } from "src/utils/uploadthing"; 
import ShopsMapClient from "~/components/dashboard/facilities/ShopsMapClient";
import "@uploadthing/react/styles.css";

interface Pet {
  petId: number;
  petName: string;
  species: string;
  imageUrl: string;
}

export default function FormularzW() {
  const [attachmentUrl, setAttachmentUrl]=useState<string | null>(null);
  const[showMap,setShowMap]=useState(false);
  const [facilities, setFacilities] = useState([]);

  const [animals, setAnimals] = useState<Pet[]>([]); 
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  

  useEffect(() => { fetch("/api/facilities")
    .then((res) => res.json()) 
    .then((data) => setFacilities(data)); 
  },[]);


  useEffect(() => { fetch("/api/animal") 
    .then((res) => res.json()) 
    .then((data) => setAnimals(data)); 
  }, []);


  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <form action={funt2} className="flex flex-col gap-4">
          
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-3">Wybierz zwierzaka</label>
            
            {/* Wybor zwierzaka */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {animals.map((pet) => (
                <div
                  key={pet.petId}
                  onClick={() => setSelectedPetId(pet.petId)}
                  className={`
                    cursor-pointer p-3 rounded-xl border-2 transition-all flex flex-col items-center
                    ${selectedPetId === pet.petId 
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" 
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"}
                  `}
                >
                  <img 
                    src={pet.imageUrl || "/svg/no-image.svg"} 
                    alt={pet.petName} 
                    className="w-12 h-12 rounded-full mb-2 object-cover border border-gray-200" 
                    
                  />
                  <span className="font-bold text-sm text-gray-800">{pet.petName}</span>
                  <span className="text-[10px] text-gray-500 uppercase">{pet.species}</span>
                </div>
              ))}
            </div>
            
            <input type="hidden" name="petId" value={selectedPetId || ""} />
            
            {selectedPetId === null && animals.length > 0 && (
              <p className="text-xs text-amber-600 mt-2">Musisz wybrać zwierzaka przed wysłaniem.</p>
            )}
          </div>
            
            {/* Szczegóły wizyty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">Data wizyty</label>
              <input 
                type="date" 
                name="data" 
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition" 
                required 
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">Typ wizyty</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="rodzaj_wizyty" 
                  placeholder="np. Kontrola, Szczepienie" 
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowMap(!showMap)} 
                  className={`px-4 rounded-lg border transition-colors ${
                    showMap ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Pokaż mapę placówek"
                >
                  {showMap ? "✕" : "📍"}
                </button>
              </div>
            </div>
          </div>

          {showMap && (
            <div className="h-72 rounded-xl overflow-hidden border border-gray-300 shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
              <ShopsMapClient shops={facilities} />
            </div>
          )}

          {/* Uwagi */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Uwagi</label>
            <input
              type="text"
              name="uwagi"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Opcjonalne uwagi"
            />
          </div>

          {/* Załącznik */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Załącznik</label>
            <UploadButton
            endpoint="visitAttachment"
            onClientUploadComplete={(res)=>{
              if (res && res[0] && res[0].ufsUrl) { setAttachmentUrl(res[0].ufsUrl); } 
            }}
            onUploadError={(e) => {
            alert("Błąd uploadu: " + e.message);
            }}
            />
            <input type="hidden" name="załączniki" value={attachmentUrl ?? ""} />
          </div>
          {/* Przyciski */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="submit" disabled={!selectedPetId} className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed" > Zarejestruj wizytę </button>
          </div>
        </form>
      </div>
    </div>
  );
}
