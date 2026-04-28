"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import ShopsMapClient from "~/components/dashboard/facilities/ShopsMapClient";
import Icon from "~/components/Icon";
import type { Shop } from "~/types/shop";

const ALL_DAYS = new Set([0, 1, 2, 3, 4, 5, 6]);

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getDayNumber(label: string): number | null {
  const dayMap: Record<string, number> = {
    pn: 1,
    pon: 1,
    monday: 1,
    wt: 2,
    wto: 2,
    wtorek: 2,
    tue: 2,
    tuesday: 2,
    sr: 3,
    sroda: 3,
    wed: 3,
    wednesday: 3,
    czw: 4,
    czwartek: 4,
    thu: 4,
    thursday: 4,
    pt: 5,
    piatek: 5,
    fri: 5,
    friday: 5,
    sob: 6,
    sobota: 6,
    sat: 6,
    saturday: 6,
    nd: 0,
    niedz: 0,
    niedziela: 0,
    sun: 0,
    sunday: 0,
  };

  return dayMap[label] ?? null;
}

function getDaySet(segmentPrefix: string, inheritedDays: Set<number> | null): Set<number> {
  const normalizedPrefix = normalizeText(segmentPrefix);
  const matches = normalizedPrefix.match(
    /\b(pn|pon|wt|wto|wtorek|sr|sroda|czw|czwartek|pt|piatek|sob|sobota|nd|niedz|niedziela|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\b/g,
  );

  if (!matches || matches.length === 0) {
    return inheritedDays ?? ALL_DAYS;
  }

  const days = matches
    .map((label) => getDayNumber(label))
    .filter((day): day is number => day !== null);

  if (days.length === 0) {
    return inheritedDays ?? ALL_DAYS;
  }

  const hasRangeSeparator = normalizedPrefix.includes("-") || normalizedPrefix.includes(" do ");
  if (hasRangeSeparator && days.length >= 2) {
    const start = days[0]!;
    const end = days[1]!;
    const rangeDays = new Set<number>();

    for (let current = start; ; current = (current + 1) % 7) {
      rangeDays.add(current);
      if (current === end) break;
    }

    return rangeDays;
  }

  return new Set(days);
}

function isOpenAtNow(openingHours: string | null, now: Date = new Date()) {
  if (!openingHours) return false;

  const normalized = normalizeText(openingHours);
  if (
    normalized.includes("24/7") ||
    normalized.includes("24h") ||
    normalized.includes("calodobowo") ||
    normalized.includes("non stop")
  ) {
    return true;
  }

  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const segments = openingHours.split(/[;,]/);
  const timeRangeRegex = /(\d{1,2})(?::(\d{2}))?\s*[-–]\s*(\d{1,2})(?::(\d{2}))?/;
  let inheritedDays: Set<number> | null = null;

  for (const rawSegment of segments) {
    const segment = rawSegment.trim();
    if (!segment) continue;

    const match = timeRangeRegex.exec(segment);
    if (!match) continue;

    const startHour = Number(match[1]);
    const startMinute = Number(match[2] ?? "0");
    const endHour = Number(match[3]);
    const endMinute = Number(match[4] ?? "0");

    if (
      Number.isNaN(startHour) ||
      Number.isNaN(startMinute) ||
      Number.isNaN(endHour) ||
      Number.isNaN(endMinute)
    ) {
      continue;
    }

    const prefix = segment.slice(0, match.index ?? 0);
    const segmentDays = getDaySet(prefix, inheritedDays);
    inheritedDays = segmentDays;

    if (!segmentDays.has(currentDay)) {
      continue;
    }

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    if (startTotal <= endTotal) {
      if (currentMinutes >= startTotal && currentMinutes <= endTotal) {
        return true;
      }
      continue;
    }

    if (currentMinutes >= startTotal || currentMinutes <= endTotal) {
      return true;
    }
  }

  return false;
}

export default function SkllepyPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [showOpenNow, setShowOpenNow] = useState(false);
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

  const filteredByType = filterType === "all" ? shops : shops.filter((s) => s.facilityType === filterType);
  const filteredShops = showOpenNow ? filteredByType.filter((shop) => isOpenAtNow(shop.openingHours)) : filteredByType;
  const shopTypes = Array.from(new Set(shops.map((s) => s.facilityType)));

  useEffect(() => {
    if (!selectedShopId) return;
    const selectedStillVisible = filteredShops.some((shop) => shop.facilityId === selectedShopId);
    if (!selectedStillVisible) {
      setSelectedShopId(null);
    }
  }, [filteredShops, selectedShopId]);

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
              <div className="mt-3 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showOpenNow}
                    onChange={(e) => setShowOpenNow(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Otwarte teraz
                </label>

                <label className="sr-only" htmlFor="facility-filter">Filtruj po rodzaju</label>
                <select
                  id="facility-filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full sm:w-72 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-800"
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
