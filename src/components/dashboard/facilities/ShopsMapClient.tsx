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
  onSelectShop?: (shop: Shop) => void;
}

export default function ShopsMapClient({ shops, selectedShopId, onSelectShop }: ShopsMapClientProps) {
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
      mapRef.current._leaflet_map = L.map(mapRef.current).setView([53.4251, 14.5508], 10);

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


    const icons: {[key: string]: string } ={
      "Gabinet Weterynaryjny": "/leaflet/veterinarian.png",
      "Groomer": "/leaflet/cat-bath.png",
      "Sklep Zoologiczny": "/leaflet/pet-shop.png"
    };

    // Dodaj nowe markery
    shops.forEach((shop) => {

      const iconUrl = icons[shop.facilityType];

      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [40,40],
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
            ${shop.email ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href ="mailto:${shop.email}"> ${shop.email}</a></p>` : ""}
            ${shop.openingHours ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Godziny:</strong> ${shop.openingHours}</p>` : ""}
            ${shop.name ? `<div style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 8px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.street + ' ' + shop.city)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            style="margin: 0 0 8px 0; font-weight: bold;">
            Otwórz w Google Maps</a></div>` : ""}
          </div>`,
          { maxWidth: 300 }
        )
        .on('click', () => {
          if (onSelectShop) onSelectShop(shop);
        })
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
