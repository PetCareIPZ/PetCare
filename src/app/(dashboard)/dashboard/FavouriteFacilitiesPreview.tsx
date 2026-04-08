'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Shop } from '~/types/facilities';
import { Heart, ArrowRight, MapPin, Phone } from 'lucide-react'; // Używamy Lucide dla spójności
import Link from 'next/link';

export default function FavoriteFacilities() {
  const [favorites, setFavorites] = useState<Shop[]>([]);
  const [allFacilities, setAllFacilities] = useState<Shop[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshFavs = useCallback(() => {
    const saved = localStorage.getItem('favoriteFacilities');
    if (saved && allFacilities.length > 0) {
      try {
        const ids = JSON.parse(saved) as number[];

        const filtered = allFacilities
          .filter(f => ids.includes(f.facilityId))
          .slice(-3)
          .reverse();
        setFavorites(filtered);
      } catch (e) {
        console.error("Błąd parsowania ulubionych", e);
      }
    }
    setIsLoaded(true);
  }, [allFacilities]);

  useEffect(() => {
    void fetch("/api/facilities")
      .then(res => res.json())
      .then((data: Shop[]) => setAllFacilities(data));
  }, []);

  useEffect(() => {
    refreshFavs();
    window.addEventListener('storage', refreshFavs);
    return () => window.removeEventListener('storage', refreshFavs);
  }, [refreshFavs]);

  if (!isLoaded || favorites.length === 0) return null;

  return (
    <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-gray-800">
          {/* Zmieniamy kolor na czerwony/różowy dla placówek medycznych */}
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          <h2 className="text-2xl font-semibold">Ulubione placówki</h2>
        </div>
        <Link href="/dashboard/visits" className="text-sm text-red-500 hover:underline font-medium">
          Zobacz wszystkie
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((f) => (
          <Link 
            key={f.facilityId}
            href={`/dashboard/visits/visit-registration?facilityId=${f.facilityId}`}
            className="group p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-red-500"
          >
            <div className="flex items-center gap-1 text-[10px] font-bold text-red-400 uppercase">
              <MapPin className="w-3 h-3" /> {f.city}
            </div>
            
            <h3 className="font-bold text-gray-900 mt-1 group-hover:text-red-600 transition-colors line-clamp-1">
              {f.name}
            </h3>
            
            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
              {f.street}<br />
                {f.city}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-[10px] font-bold text-red-600 uppercase">
                Umów wizytę <ArrowRight className="ml-1 w-3 h-3" />
              </div>
              
              {f.phone && (
                <div className="flex items-center gap-1 text-[9px] text-gray-400 font-medium">
                  <Phone className="w-3 h-3" /> {f.phone}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}