"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import ShopsMapClient from "~/components/dashboard/facilities/ShopsMapClient";
import Icon from "~/components/Icon";

interface Shop {
  facilityId: number;
  name: string;
  facilityType: string;
  city: string;
  street: string | null;
  lat: number;
  lon: number;
  phone: string | null;
  email: string | null;
  website: string | null;
  openingHours: string | null;
}

export default function SkllepyPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("/api/facilities");
        const data = (await response.json()) as Shop[];
        setShops(data);
      } catch (error) {
        console.error("Błąd pobierania sklepów:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchShops();
  }, []);

  const filteredShops = filterType === "all" ? shops : shops.filter((s) => s.facilityType === filterType);
  const shopTypes = Array.from(new Set(shops.map((s) => s.facilityType)));

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-gray-800">
        <Icon name="map" /> Placówki Blisko Ciebie
      </h1>

      <AnimatedSection>
        <div className="space-y-6">
          {/* Mapa */}
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 z-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Mapa</h2>
              {loading ? (
                <div className="w-full h-64 sm:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-sm sm:text-base text-gray-500">Ładowanie mapy...</p>
                </div>
              ) : (
                <ShopsMapClient shops={filteredShops} selectedShopId={selectedShopId} />
              )}
            </div>
          </div>

          {/* Szczegóły wybranej placówki - powyżej listy */}
          {selectedShopId && (
            <AnimatedSection delay={0.05}>
              <div className="bg-white rounded-2xl shadow-md p-6">
                {filteredShops.find((s) => s.facilityId === selectedShopId) && (
                  <ShopDetailsCard shop={filteredShops.find((s) => s.facilityId === selectedShopId)!} />
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Lista sklepów */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Placówki Blisko Ciebie</h2>
              <div className="mt-3 md:mt-0 w-full md:w-1/3">
                <label className="sr-only" htmlFor="facility-filter">Filtruj po rodzaju</label>
                <select
                  id="facility-filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-800"
                >
                  <option value="all">Wszystkie ({shops.length})</option>
                  {shopTypes.map((type) => (
                    <option key={type} value={type}>
                      {type} ({shops.filter((s) => s.facilityType === type).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Kontener listy z ograniczoną wysokością */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar"
              style={{ maxHeight: 'calc(2 * 160px + 1rem)' }}
            >
              {loading ? (
                <p className="text-gray-500 text-center text-sm py-4 col-span-full">Ładowanie...</p>
              ) : filteredShops.length === 0 ? (
                <p className="text-gray-500 text-center text-sm py-4 col-span-full">Brak wyników</p>
              ) : (
                filteredShops.map((shop) => (
                  <div
                    key={shop.facilityId}
                    onClick={() => setSelectedShopId(shop.facilityId)}
                    className={`p-4 rounded-xl cursor-pointer transition flex flex-col justify-between h-[160px] ${
                      selectedShopId === shop.facilityId
                        ? "bg-primary/10 border-2 border-primary shadow-sm"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm line-clamp-1">{shop.name}</p>
                      <p className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider font-medium">{shop.facilityType}</p>
                      {shop.street && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {shop.street}<br />{shop.city}
                        </p>
                      )}
                    </div>
                    {shop.phone && (
                      <p className="text-xs text-primary font-medium mt-auto pt-2">{shop.phone}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}

function ShopDetailsCard({ shop }: { shop: Shop }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{shop.name}</h3>
        <p className="text-sm sm:text-base text-primary font-semibold uppercase tracking-wider">{shop.facilityType}</p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shop.street && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Adres</p>
            <p className="text-sm text-gray-800 font-medium">{shop.street}</p>
            <p className="text-sm text-gray-700">{shop.city}</p>
          </div>
        )}

        {shop.phone && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Telefon</p>
            <a href={`tel:${shop.phone}`} className="text-sm text-primary hover:text-primary/80 hover:underline font-medium">
              {shop.phone}
            </a>
          </div>
        )}

        {shop.email && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email</p>
            <a href={`mailto:${shop.email}`} className="text-sm text-primary hover:text-primary/80 hover:underline font-medium break-all">
              {shop.email}
            </a>
          </div>
        )}

        {shop.openingHours && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Godziny otwarcia</p>
            <p className="text-sm text-gray-800 font-medium">{shop.openingHours}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {shop.website && (
        <a
          href={shop.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-lg shadow transition text-center text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <span>🌐</span>
          <span>Odwiedź stronę</span>
        </a>
      )}
    </div>
  );
}
