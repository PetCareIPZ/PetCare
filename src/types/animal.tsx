export interface Animal {
    petId: number;
    userId: string;
    petName: string;
    species: string;
    race: string;
    sex: string;
    birthDate: string;
    weight: string;
    chipNumber: string | null;
    imageUrl: string;
    createdAt: Date | null;
}

export interface PetOption {
    petId: number;
    petName: string;
}

export interface DeleteAnimalProps {
  animal: Animal;
}