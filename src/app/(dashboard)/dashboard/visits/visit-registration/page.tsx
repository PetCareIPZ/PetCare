import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import FormRegistrationWidget from "~/components/dashboard/visits/formRegistrationWidget";
import { Suspense } from "react";
import type { SearchParams } from "~/types/visits";

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> 
}) {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-400 flex flex-col items-center gap-2">
        <Link href="/" className="underline font-medium text-blue-600">
          Zaloguj się
        </Link>
        <span className="text-gray-600">aby uzyskać dostęp do tej strony</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <Suspense 
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-2xl px-4 h-[600px] bg-gray-50/50 animate-pulse rounded-2xl border border-gray-100" />
          </div>
        }
      >
        <FormRegistrationWidget searchParams={searchParams} />
      </Suspense>
    </div>
  );
}