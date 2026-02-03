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
    <main className="max-w-7xl mx-auto px-6 py-10 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Zaplanowane wizyty
        </h1>
        <p className="text-gray-600">
          Przeglądaj dostępne placówki weterynaryjne na mapie i umów wizytę dla swojego zwierzaka
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <FacilitiesMap facilities={facilities} />
      </div>
    </main>
  );
}
