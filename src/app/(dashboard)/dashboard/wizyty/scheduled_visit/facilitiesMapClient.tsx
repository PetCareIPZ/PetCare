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
    facilities: Facility[]
};


export default function FacilitiesMapClient({ facilities }: Props) {
    
  const center: [number, number] = [53.4251, 14.5508];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      style={{ height: "2160px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {facilities.map((f) =>(
        <Marker 
        key={f.facilityId}
        position={[Number(f.lat), Number(f.lon)]}
        >
            <Popup>
                <strong>{f.name}</strong> <br />
                <strong>Placowka:</strong> <br />
                {f.facilityType}<br />
                <strong>Ulica:</strong> <br />
                {f.street} <br />
                <strong>Godziny otwarcia:</strong> <br />
                {f.openingHours}<br />
                <strong>Telefon:</strong> <br />
                {f.phone}<br />
                <strong>Mail:</strong> <br />
                <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${f.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >{f.email}</a> <br />
                <strong>Website:</strong> <br />
                <a
                    href={`${f.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >{f.website}</a> <br />
                <br />
                <a
                    href={`https://www.google.com/maps?q=${f.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Otwórz w Google Maps
                </a>
            </Popup>
        </Marker>
    ))}
      
    </MapContainer>
  );
}
