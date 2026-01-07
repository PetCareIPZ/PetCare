import {serial, text, integer, timestamp, numeric, date, varchar, pgTable,} from "drizzle-orm/pg-core";

export const pets = pgTable("pets", {
  petId: serial("id").primaryKey(),
  userId: varchar("userId", {length:255}).notNull(),
  petName: varchar("petName", {length:255}).notNull(),
  species: varchar("species", {length:255}).notNull(),
  race: varchar("race", {length:255}).notNull(),
  sex: varchar("sex", {length:6}).notNull(),
  birthDate: date("birthDate").notNull(),
  weight: numeric("weight").notNull(),
  chipNumber: varchar("chipNumber", {length: 15}),
  imageUrl: text("imageUrl").notNull().default("svg/no-image.svg"),
  createdAt: timestamp("createdAt").defaultNow()
});


export const vaccinations = pgTable("vaccinations",{
  vaccinationId: serial("vaccinationId").primaryKey(),
  petId: integer("petId").notNull().references(() => pets.petId),
  vaccinationDate: date("vaccinationDate").notNull(),
  vaccinationType: varchar("vaccinationType", {length: 255}).notNull(),
  vaccinationNote: text("vaccinationNote"),
  vaccinationDose: varchar("vaccinationDose").notNull(),
});


export const drugs = pgTable("drugs",{
  drugId: serial("drugId").primaryKey(),
  petId: integer("petId").notNull().references(() => pets.petId),
  drugDate: date("drugDate").notNull(),
  drugType: varchar("drugType", {length: 255}).notNull(),
  drugNote: text("drugNote"),
  drugDose: varchar("drugDose").notNull()
});


export const visits = pgTable("visits",{
  visitId: serial("visitId").primaryKey(),
  petId: integer("petId").notNull().references(() => pets.petId),
  visitDate: date("visitDate").notNull(),
  visitType: varchar("visitType", {length: 255}).notNull(),
  visitNote: text("visitNote"),
  visitAttachment: text("visitAttachment")
})

