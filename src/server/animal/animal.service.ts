"use server";

import { db } from "~/server/db/index";
import { drugs, pets, vaccinations } from "~/server/db/schema";
import { and, eq } from 'drizzle-orm';
import type { AddAnimalData, UpdateAnimalData, AddDrugData, UpdateDrugData, AddVaccData, UpdateVaccData } from "~/types/services";


export async function addAnimal(formData: AddAnimalData){
    const newPetId = await db.insert(pets).values({
        userId: formData.userId,
        petName: formData.name,
        species: formData.species,
        race: formData.race,
        sex: formData.sex,
        birthDate: formData.dateOfBirth,
        weight: formData.weight,
        chipNumber: formData.chipNumber,
        imageUrl: formData.imageUrl!
    }).returning({petId: pets.petId});
    return newPetId;
}

export async function deleteAnimal(petId: number, userId :string){
    await db.delete(pets).where(
        and(
            eq(pets.userId, userId),
            eq(pets.petId, petId)
        )
    );
}
export async function updateAnimal(formData: UpdateAnimalData, userId: string){
    await db.update(pets).set({
        petName: formData.name,
        birthDate: formData.dateOfBirth,
        species: formData.species,
        race: formData.race,
        sex: formData.sex,
        weight: formData.weight,
        chipNumber: formData.chipNumber,
        imageUrl: formData.imageUrl
    }).where(
        and(
            eq(pets.userId, userId),
            eq(pets.petId, formData.petId))
        )
    ;
}

export async function getAnimals(id : string){
    return db.select().from(pets).where(eq(pets.userId,id));
}

export async function getAnimalById(petId: number, userId: string){
    return db.select().from(pets).where(
        and(
            eq(pets.petId, petId),
            eq(pets.userId, userId)
        )
    );
}

export async function addDrug(userData: AddDrugData){
    await db.insert(drugs).values({
        petId: userData.petId,
        drugType: userData.drugType,
        drugDate: userData.drugDate,
        drugDose: userData.drugDose,
        drugNote: userData.drugNote
    });
}

export async function deleteDrug(drugId: number, petId: number){
    await db.delete(drugs).where(
        and(
            eq(drugs.drugId, drugId),
            eq(drugs.petId, petId)
        )
    );
}

export async function getDrugs(petId: number){
    return db.select().from(drugs).where(eq(drugs.petId, petId));
}

export async function getDrugById(drugId: number, petId: number){
    return db.select().from(drugs).where(
        and(
            eq(drugs.drugId, drugId),
            eq(drugs.petId, petId)
        )
    );
}

export async function updateDrug(drugData: UpdateDrugData){
    await db.update(drugs).set({
        drugType: drugData.drugType,
        drugDate: drugData.drugDate,
        drugDose: drugData.drugDose,
        drugNote: drugData.drugNote
    }).where(
        and(
            eq(drugs.drugId, drugData.drugId),
            eq(drugs.petId, drugData.petId)
        )
    );
}   

export async function addVacc(vaccData: AddVaccData){
    await db.insert(vaccinations).values({
        petId: vaccData.petId,
        vaccinationType: vaccData.vaccType,
        vaccinationDate: vaccData.vaccDate,
        vaccinationDose: vaccData.vaccDose,
        vaccinationNote: vaccData.vaccNote
    });
}

export async function updateVacc(vaccData: UpdateVaccData){
    await db.update(vaccinations).set({
        vaccinationType: vaccData.vaccType,
        vaccinationDate: vaccData.vaccDate,
        vaccinationDose: vaccData.vaccDose,
        vaccinationNote: vaccData.vaccNote
    }).where(
        and(
            eq(vaccinations.vaccinationId, vaccData.vaccId),
            eq(vaccinations.petId, vaccData.petId)
        )
    );
}

export async function deleteVacc(vaccId: number, petId: number){
    await db.delete(vaccinations).where(
        and(
            eq(vaccinations.vaccinationId, vaccId),
            eq(vaccinations.petId, petId)
        )
    );
}

export async function getVaccs(petId: number){
    return db.select().from(vaccinations).where(eq(vaccinations.petId, petId));
}

export async function getVaccById(vaccId: number, petId: number){
    return db.select().from(vaccinations).where(
        and(
            eq(vaccinations.vaccinationId, vaccId),
            eq(vaccinations.petId, petId)
        )
    );
}