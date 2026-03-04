export interface Animal {
  petId: number;
  petName: string;
  species: string;
  race: string;
  sex: string;
  birthDate: string | Date;
  weight: number;
  chipNumber?: string | null;
  imageUrl?: string | null;
  createdAt: string | Date;
}