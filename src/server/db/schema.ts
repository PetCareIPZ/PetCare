import {serial, text, integer, timestamp, numeric, date, varchar, pgTable, bigint, boolean} from "drizzle-orm/pg-core";

export const pets = pgTable("pets", {
  petId: serial("id").primaryKey(),
  userId: varchar("userId", {length:255}).notNull(),
  petName: varchar("petName", {length:255}).notNull(),
  species: varchar("species", {length:255}).notNull(),
  race: varchar("race", {length:255}).notNull(),
  sex: varchar("sex", {length:255}).notNull(),
  birthDate: date("birthDate").notNull(),
  weight: numeric("weight").notNull(),
  chipNumber: varchar("chipNumber", {length: 15}),
  imageUrl: text("imageUrl").notNull(),
  createdAt: timestamp("createdAt").defaultNow()
});


export const vaccinations = pgTable("vaccinations",{
  vaccinationId: serial("vaccinationId").primaryKey(),
  petId: integer("petId").notNull().references(() => pets.petId, {onDelete: 'cascade'}),
  vaccinationDate: date("vaccinationDate").notNull(),
  vaccinationType: varchar("vaccinationType", {length: 255}).notNull(),
  vaccinationNote: text("vaccinationNote"),
  vaccinationDose: varchar("vaccinationDose").notNull(),
});


export const drugs = pgTable("drugs",{
  drugId: serial("drugId").primaryKey(),
  petId: integer("petId").notNull().references(() => pets.petId, {onDelete: 'cascade'}),
  drugDate: date("drugDate").notNull(),
  drugType: varchar("drugType", {length: 255}).notNull(),
  drugNote: text("drugNote"),
  drugDose: varchar("drugDose").notNull()
});


export const visits = pgTable("visits",{
  visitId: serial("visitId").primaryKey(),
  petId: integer("petId").notNull().references(() => pets.petId, {onDelete: 'cascade'}),
  facilityId: integer("facilityId").references(() => facilities.facilityId),
  visitDate: date("visitDate").notNull(),
  visitType: varchar("visitType", {length: 255}).notNull(),
  visitNote: text("visitNote"),
  visitAttachment: text("visitAttachment"),
  isNotified: boolean("isNotified").notNull().default(false)
})

export const facilities = pgTable("facilities",{
  facilityId: serial ("facilityId").primaryKey(),
  osmId: bigint("osmId", { mode: "number" }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  facilityType: varchar("facilityType", {length:50}).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  street: varchar("street", { length: 255 }),
  lat: numeric("lat", { precision: 9, scale: 6 }).$type<number>().notNull(),
  lon: numeric("lon", { precision: 9, scale: 6 }).$type<number>().notNull(),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  website: text("website"),
  openingHours: text("openingHours")
});

export const notificationSettings = pgTable("notification_settings", {
  userId: varchar("userId", { length: 255 }).primaryKey(),
  mailEnabled: boolean("mailEnabled").notNull().default(true),
  pushEnabled: boolean("pushEnabled").notNull().default(true),
})

export const pushSubscriptions = pgTable("push_subscriptions", {
  userId: text("user_id").notNull(),
  endpoint: text("endpoint").notNull().unique(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});