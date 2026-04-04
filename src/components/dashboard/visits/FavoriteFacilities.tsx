'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Shop } from '~/types/facilities';
import Icon from '~/components/Icon';
import Link from 'next/link';

export default function FavoriteFacilities() {
  const [favorites, setFavorites] = useState<Shop[]>([]);
  const [allFacilities, setAllFacilities] = useState<Shop[]>([]);

  const refreshFavs = useCallback(() => {
    const saved = localStorage.getItem('favoriteFacilities');
    if (saved && allFacilities.length > 0) {
      try {
        const ids = JSON.parse(saved) as number[];
        const filtered = allFacilities.filter(f => ids.includes(f.facilityId));
        setFavorites(filtered);
      } catch (e) {
        console.error("Błąd parsowania ulubionych", e);
      }
    }
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
  if (favorites.length === 0) return null;

  return (
    <div className="mb-10 animate-in slide-in-from-left duration-500">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
        <Icon name="heart"/> Twoje ulubione placówki
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map(f => (
            <Link
            key={f.facilityId}
            href={`/dashboard/visits/visit-registration?facilityId=${f.facilityId}`}
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
            <p className="font-bold text-gray-900 truncate">{f.name}</p>
            <p className="text-xs text-gray-500">{f.city}, {f.street}</p>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase">
              <Icon name="phone" /> {f.phone ?? 'Brak tel.'} 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}