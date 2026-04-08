"use server";
import { auth,currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import SettingsPageComponent from "~/components/settings/settingsPage"
import type settingsUserData from "~/types/settingsUserData";
export default async function UstawieniaPage() {
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center mt-20 text-red-400">
        <Link href="/" className="underline">Zaloguj się</Link> aby uzyskać dostęp do tej strony.
      </div>
    );
  }
  const userData = { id: user.id, firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddresses[0]?.emailAddress };

  return (
    <SettingsPageComponent {...userData}/>
  );
}
