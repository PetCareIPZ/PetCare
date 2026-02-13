"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type Facility = {
  facilityId: number;
  osmId: string;
  name: string;
  facilityType: string;
  city: string;
  street: string | null;
  lat: string;
  lon: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  openingHours: string | null;
};

type Props = {
  facilities: Facility[];
};

export default function FacilitiesMapClient({ facilities }: Props) {
  const center: [number, number] = [53.4251, 14.5508];

  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {facilities.map((f) => (
          <Marker
            key={f.facilityId}
            position={[Number(f.lat), Number(f.lon)]}
          >
            <Popup className="facility-popup">
              <div className="w-64 text-sm">
                <h3 className="font-bold text-gray-900 mb-3 text-base">
                  {f.name}
                </h3>
                
                <div className="space-y-2 text-gray-700">
                  {f.facilityType && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Typ placówki:
                      </span>{" "}
                      {f.facilityType}
                    </div>
                  )}

                  {f.street && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Adres:
                      </span>{" "}
                      {f.street}
                    </div>
                  )}

                  {f.openingHours && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Godziny otwarcia:
                      </span>{" "}
                      {f.openingHours}
                    </div>
                  )}

                  {f.phone && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Telefon:
                      </span>{" "}
                      <a
                        href={`tel:${f.phone}`}
                        className="text-purple-600 hover:text-purple-700 hover:underline"
                      >
                        {f.phone}
                      </a>
                    </div>
                  )}

                  {f.email && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Email:
                      </span>{" "}
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${f.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 hover:underline"
                      >
                        {f.email}
                      </a>
                    </div>
                  )}

                  {f.website && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Website:
                      </span>{" "}
                      <a
                        href={f.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 hover:underline"
                      >
                        {f.website}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(f.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium hover:underline"
                  >
                    Otwórz w Google Maps →
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
