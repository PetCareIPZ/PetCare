import { pets } from "~/server/db/schema";
import { db } from "../../../../server/db/index";
import Image from "next/image";
import { eq, lt, gte, ne } from 'drizzle-orm';
interface UserProfileProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    id? : string | null;
    emailAddresses?: { emailAddress: string }[];
  } | null;
}

export default async function UserAnimalsCards({user} : UserProfileProps){
    const results = await db.select().from(pets).where(eq(pets.userId,user?.id));
    return results.map(animal => (
        <div key={animal.petId} className="flex flex-col items-center bg-white rounded-xl shadow-md w-64 h-60 p-4 transition duration-200 ease-out hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 border border-transparent hover:border-gray-200">
            <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            <Image
                unoptimized
                width={500}
                height={500}
                src={animal.imageUrl}
                // className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-white transition-colors duration-200 hover:bg-gray-50"
                alt={animal.petName}
            />
            </div>
            <div className="mt-4 text-lg font-semibold text-center">
              {animal.petName}
            </div>
        </div>    
    )
    ) 
}