"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

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

interface ShopsMapClientProps {
  shops: Shop[];
  selectedShopId?: number | null;
}

export default function ShopsMapClient({ shops, selectedShopId }: ShopsMapClientProps) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: number]: any }>({});
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Import leaflet dynamicznie na kliencie
    import("leaflet").then((leafletModule) => {
      setL(leafletModule.default);
    });
  }, []);

  useEffect(() => {
    if (!L || !mapRef.current) return;

    if (!mapRef.current._leaflet_map) {
      mapRef.current._leaflet_map = L.map(mapRef.current).setView([52.2297, 21.0122], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapRef.current._leaflet_map);
    }

    const map = mapRef.current._leaflet_map;

    // Wyczyść stare markery
    Object.values(markersRef.current).forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    // Dodaj nowe markery
    shops.forEach((shop) => {
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: white; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });

      const marker = L.marker([shop.lat, shop.lon], { icon: customIcon })
        .bindPopup(
          `<div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${shop.name}</h3>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Typ:</strong> ${shop.facilityType}</p>
            ${shop.street ? `<p style="margin: 4px 0; font-size: 14px;">${shop.street}, ${shop.city}</p>` : `<p style="margin: 4px 0; font-size: 14px;">${shop.city}</p>`}
            ${shop.phone ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> ${shop.phone}</p>` : ""}
            ${shop.email ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${shop.email}</p>` : ""}
            ${shop.openingHours ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Godziny:</strong> ${shop.openingHours}</p>` : ""}
          </div>`,
          { maxWidth: 300 }
        )
        .addTo(map);

      markersRef.current[shop.facilityId] = marker;
    });

    // Jeśli wybrany sklep, otwórz jego popup
    if (selectedShopId && markersRef.current[selectedShopId]) {
      markersRef.current[selectedShopId].openPopup();
      map.setView(
        [shops.find((s) => s.facilityId === selectedShopId)?.lat || 52.2297, 
         shops.find((s) => s.facilityId === selectedShopId)?.lon || 21.0122],
        15
      );
    }
  }, [L, shops, selectedShopId]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} className="sm:h-96 md:h-96 rounded-lg" />;
}
