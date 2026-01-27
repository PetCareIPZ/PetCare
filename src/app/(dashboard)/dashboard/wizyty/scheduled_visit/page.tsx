import FacilitiesMap from "./facilitieMap";

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

async function getFacilities(): Promise<Facility[]> {
  const res = await fetch("http://localhost:3000/api/facilities", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch facilities");
  }

  return res.json();
}

export default async function Page() {
  const facilities = await getFacilities();

  return (
    <div>
      <h1>Zaplanowane wizyty</h1>
      <FacilitiesMap facilities={facilities} />
    </div>
  );
}
