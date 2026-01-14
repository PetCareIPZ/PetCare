import fs from "fs";
import { db } from "~/server/db/index";
import { facilities } from "./schema";
import { sql } from "drizzle-orm";

const raw = JSON.parse(
  fs.readFileSync("C:/Users/User/szczecin-vets2.json", "utf-8")
);

const rows = raw.elements
  .filter((e: any) => e.type === "node" && e.tags?.name)
  .map((e: any) => ({
    osmId: BigInt(e.id),
    name: e.tags.name,
    facilityType: "veterinary",
    city: "Szczecin",
    street: e.tags["addr:street"] ?? null,
    lat: e.lat.toString(),
    lon: e.lon.toString(),
    phone: e.tags.phone ?? null,
    email: e.tags.email ?? null,
    openingHours: e.tags.opening_hours ?? null,
    website: e.tags.website ?? null,
  }));
  console.log("Rekordów do insertu:", rows.length);

async function run() {
  await db
    .insert(facilities)
    .values(rows)
    .onConflictDoUpdate({
    target: facilities.osmId,
    set: {
      email: sql`EXCLUDED.email`,
    },
  });
  console.log("Import zakończony");
}

run().catch(console.error);
