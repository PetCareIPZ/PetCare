export interface Pet {
  petId: number;
  petName: string;
  species: string;
  imageUrl: string;
}

export interface Facility {
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
export interface SearchParams {
  petId?: string;
  [key: string]: string | string[] | undefined;
}

export interface Visit {
  visitID: number;
  visitDate: Date;
  visitType: string;
  visitAttachment?: string | null;
  visitNote?: string | null;
  petID: number;
  facilityId?: number | null;
}

export interface Props {
  petName: string;
  visits: Visit[];
}