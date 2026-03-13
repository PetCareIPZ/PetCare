import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import FormRegistrationWidget from "~/components/dashboard/visits/formRegistrationWidget";
import type { SearchParams } from "~/types/visits";

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
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
            {/* <FormRegistrationWidget searchParams={searchParams} /> */}
            <h1>Hydracja dziala bez formularza</h1>
        </div>
    )
}