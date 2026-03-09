export interface AddDrugData {
    petId: number;
    drugType: string;
    drugDate: string;
    drugDose: string;
    drugNote?: string;
}

export interface UpdateDrugData {
    petId: number;
    drugId: number;
    drugType?: string;
    drugDate?: string;
    drugDose?: string;
    drugNote?: string;
}


export interface AddVaccData {
    petId: number;
    vaccType: string;
    vaccDate: string;
    vaccDose: string;
    vaccNote: string;

}

export interface UpdateVaccData {
    petId: number;
    vaccId: number;
    vaccType?: string;
    vaccDate?: string;
    vaccDose?: string;
    vaccNote?: string;
}


export interface AddAnimalData {
    userId: string;
    name: string;
    race: string;
    species: string;
    sex: string;
    dateOfBirth: string;
    weight: string;
    chipNumber: string;
    imageUrl: string | null;
}

export interface UpdateAnimalData {
    petId: number;
    name?: string;
    dateOfBirth?: string;
    species?: string;
    race?: string;
    sex?: string;
    weight?: string;
    chipNumber?: string;
    imageUrl?: string;
}