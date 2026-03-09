import Image from "next/image";
import Link from "next/link";
import { getAnimals } from "~/server/animal/animal.service";
import type { UserProfileProps } from "~/types/user";

export default async function UserAnimalsCards({ user }: UserProfileProps) {
  const results = await getAnimals(user?.id!);

  return results.map((animal) => (
    <Link
      href={`/dashboard/${animal.petId}`}
      key={animal.petId}
      className="group"
    >
      <div
        className="relative flex flex-col items-center bg-white rounded-xl shadow-md
                   w-64 h-60 p-4 transition duration-200 ease-out
                   hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50
                   border border-transparent hover:border-gray-200 overflow-hidden"
      >
        {/* Obrazek */}
        <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <Image
            unoptimized
            width={500}
            height={500}
            src={animal.imageUrl}
            alt={animal.petName}
          />
        </div>

        {/* Nazwa zwierzaka */}
        <div className="mt-4 text-lg font-semibold text-center text-gray-800">
          {animal.petName}
        </div>

        {/* Overlay EDYTUJ */}
        <div
          className="absolute inset-0 bg-black/30 flex items-center justify-center
                     text-white text-lg font-semibold opacity-0
                     transition-opacity duration-200
                     group-hover:opacity-100"
        >
          Zarządzaj
        </div>
      </div>
    </Link>
  ));
}
