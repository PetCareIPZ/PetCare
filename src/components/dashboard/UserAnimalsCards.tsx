import Image from "next/image";
import { getAnimals } from "~/server/animal/animal.service";


interface UserProfileProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    id? : string | null;
    emailAddresses?: { emailAddress: string }[];
  } | null;
}

export default async function UserAnimalsCards({user} : UserProfileProps){
    const results = await getAnimals(user?.id!);
    return results.map(animal => (
        <div key={animal.petId} className="flex flex-col items-center bg-white rounded-xl shadow-md w-64 h-60 p-4 transition duration-200 ease-out hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 border border-transparent hover:border-gray-200">
            <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            <Image
                unoptimized
                width={500}
                height={500}
                src={animal.imageUrl}
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