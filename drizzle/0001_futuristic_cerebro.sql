ALTER TABLE "drugs" DROP CONSTRAINT "drugs_petId_pets_id_fk";
--> statement-breakpoint
ALTER TABLE "vaccinations" DROP CONSTRAINT "vaccinations_petId_pets_id_fk";
--> statement-breakpoint
ALTER TABLE "visits" DROP CONSTRAINT "visits_petId_pets_id_fk";
--> statement-breakpoint
ALTER TABLE "visits" ADD COLUMN "facilityId" integer;--> statement-breakpoint
ALTER TABLE "drugs" ADD CONSTRAINT "drugs_petId_pets_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_petId_pets_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "visits_facilityId_facilities_facilityId_fk" FOREIGN KEY ("facilityId") REFERENCES "public"."facilities"("facilityId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "visits_petId_pets_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;