"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import ShopsMapClient from "~/components/dashboard/placowki/ShopsMapClient";

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
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error("Błąd pobierania sklepów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const filteredShops = filterType === "all" ? shops : shops.filter((s) => s.facilityType === filterType);
  const shopTypes = Array.from(new Set(shops.map((s) => s.facilityType)));

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-gray-800">
        📍 Placówki Blisko Ciebie
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

          {/* Lista sklepów */}
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Placówki Blisko Ciebie</h2>

              {/* Filtry */}
              <div className="mb-6">
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-3">Filtruj po kategorii:</p>
                <select
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

              {/* Lista z ograniczoną wysokością i wewnętrznym scrollem */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Placówki Blisko Ciebie</h2>

                {/* Filtry */}
                <div className="mb-6">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-3">Filtruj po kategorii:</p>
                  <select
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

                {/* Kontener listy z ograniczoną wysokością */}
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-y-auto pr-2 custom-scrollbar"
                  style={{ maxHeight: 'calc(2 * 145px + 1rem)' }} // Dynamiczna wysokość dla 2 rzędów + gap
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
                        className={`p-3 sm:p-4 rounded-lg cursor-pointer transition flex flex-col justify-between h-[145px] ${
                          selectedShopId === shop.facilityId
                            ? "bg-primary/10 border-2 border-primary shadow-sm"
                            : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-1">{shop.name}</p>
                          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 uppercase tracking-wider font-medium">{shop.facilityType}</p>
                          {shop.street && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {shop.street}<br/>{shop.city}
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
          </div>
        </div>
      </AnimatedSection>

      {selectedShopId && (
        <AnimatedSection delay={0.1}>
          <div className="mt-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
              {filteredShops.find((s) => s.facilityId === selectedShopId) && (
                <ShopDetailsCard shop={filteredShops.find((s) => s.facilityId === selectedShopId)!} />
              )}
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  );
}

function ShopDetailsCard({ shop }: { shop: Shop }) {
  const handleDirections = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${shop.lat},${shop.lon}`;
      window.open(mapsUrl, "_blank");
    } catch (error) {
      alert("Nie udało się pobrać Twojej lokalizacji. Sprawdź uprawnienia.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{shop.name}</h3>
        <p className="text-sm sm:text-base text-primary font-semibold mb-4">{shop.facilityType}</p>

        <div className="space-y-3 text-gray-700 text-sm sm:text-base">
          {shop.street && (
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Adres</p>
              <p>{shop.street}, {shop.city}</p>
            </div>
          )}

          {shop.phone && (
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Telefon</p>
              <a href={`tel:${shop.phone}`} className="text-primary hover:underline">
                {shop.phone}
              </a>
            </div>
          )}

          {shop.email && (
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Email</p>
              <a href={`mailto:${shop.email}`} className="text-primary hover:underline break-all">
                {shop.email}
              </a>
            </div>
          )}

          {shop.openingHours && (
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Godziny otwarcia</p>
              <p>{shop.openingHours}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleDirections}
          className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow transition text-sm sm:text-base"
        >
          🗺️ Dojazd
        </button>
        {shop.website && (
          <a
            href={shop.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow transition text-center text-sm sm:text-base"
          >
            Odwiedź stronę
          </a>
        )}
      </div>
    </div>
  );
}
