-- powiązania bez kaskady
ALTER TABLE "drugs" DROP CONSTRAINT "drugs_petId_pets_id_fk";
ALTER TABLE "vaccinations" DROP CONSTRAINT "vaccinations_petId_pets_id_fk";
ALTER TABLE "visits" DROP CONSTRAINT "visits_petId_pets_id_fk";

-- kaskada
ALTER TABLE "drugs" 
ADD CONSTRAINT "drugs_petId_pets_id_fk" 
FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "vaccinations" 
ADD CONSTRAINT "vaccinations_petId_pets_id_fk" 
FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "visits" 
ADD CONSTRAINT "visits_petId_pets_id_fk" 
FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;