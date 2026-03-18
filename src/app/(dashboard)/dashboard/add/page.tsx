import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { AddAnimalFormWidget } from "~/components/dashboard/add/formAddAnimal";
import { Suspense } from "react";

export default async function Page() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-400">
        <Link href="/" className="underline">Zaloguj się</Link>
        <span> aby uzyskać dostęp do tej strony</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Suspense fallback={<div className="p-8 text-center animate-pulse text-gray-400">Ładowanie...</div>}>
        <AddAnimalFormWidget />
      </Suspense>
    </div>
  );
}