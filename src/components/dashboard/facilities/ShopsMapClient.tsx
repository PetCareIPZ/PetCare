"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import type * as LType from "leaflet";
import type { Shop, ShopsMapClientProps } from "~/types/facilities";

export default function ShopsMapClient({ shops, selectedShopId, onSelectShop }: ShopsMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const leafletMapRef = useRef<LType.Map | null>(null);
  
  const markersRef = useRef<Record<number, LType.Marker>>({});
  
  const [leafletLib, setLeafletLib] = useState<typeof LType | null>(null);

  const handleSelect = useCallback((shop: Shop) => {
    onSelectShop?.(shop);
  }, [onSelectShop]);

  useEffect(() => {
    void import("leaflet").then((leafletModule) => {
      setLeafletLib(leafletModule);
    });
  }, []);

  useEffect(() => {
    if (!leafletLib || !mapRef.current) return;

    const L = leafletLib;

    if (!leafletMapRef.current && mapRef.current) {
      const mapInstance = L.map(mapRef.current).setView([53.4251, 14.5508], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapInstance);

      leafletMapRef.current = mapInstance;
    }

    const map = leafletMapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    const icons: Record<string, string> = {
      "Gabinet Weterynaryjny": "/leaflet/veterinarian.png",
      "Groomer": "/leaflet/cat-bath.png",
      "Sklep Zoologiczny": "/leaflet/pet-shop.png"
    };

    // Dodaj nowe markery
    shops.forEach((shop) => {
      const iconUrl = icons[shop.facilityType] ?? "/leaflet/default.png";

      const customIcon = L.icon({
        iconUrl: iconUrl,
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
            ${shop.email ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href ="mailto:${shop.email}"> ${shop.email}</a></p>` : ""}
            ${shop.openingHours ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Godziny:</strong> ${shop.openingHours}</p>` : ""}
            ${shop.name ? `<div style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 8px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + (shop.street ?? '') + ' ' + shop.city)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            style="margin: 0 0 8px 0; font-weight: bold;">
            Otwórz w Google Maps</a></div>` : ""}
          </div>`,
          { maxWidth: 300 }
        )
        .on('click', () => {
          handleSelect(shop);
        })
        .addTo(map);

      markersRef.current[shop.facilityId] = marker;
    });

    // Obsługa wybranego sklepu
    if (selectedShopId && markersRef.current[selectedShopId]) {
      const targetMarker = markersRef.current[selectedShopId];
      targetMarker.openPopup();
      
      const shop = shops.find((s) => s.facilityId === selectedShopId);
      if (shop) {
        map.setView([shop.lat, shop.lon], 15);
      }
    }
  }, [leafletLib, shops, selectedShopId, handleSelect]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} className="sm:h-96 md:h-96 rounded-lg" />;
}