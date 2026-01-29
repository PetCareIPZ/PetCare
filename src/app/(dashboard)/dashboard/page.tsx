import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import UserProfile from "~/components/dashboard/UserProfile";
import StatsCard from "~/components/dashboard/StatsCard";
import UserAnimalsCards from "~/components/dashboard/UserAnimalsCards";
import AnimatedSection from "~/components/public/ui/AnimatedSection";

export default async function DashboardPage() {
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20 text-red-400">
        <a href="/" className="underline">Zaloguj się</a> aby uzyskać dostęp do tej strony.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 overflow-x-hidden">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        Witaj, {user?.firstName}! 👋
      </h1>

      <AnimatedSection>
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            Twoje zwierzaki
          </h2>

          <div className="flex flex-wrap gap-6 bg-gray-50 p-6 rounded-2xl shadow-md">
            <UserAnimalsCards user={user} />

            <Link href="/dashboard/dodaj" className="group">
              <div className="flex flex-col items-center justify-center w-64 h-60
                              rounded-2xl border-2 border-dashed border-gray-300
                              cursor-pointer transition
                              hover:bg-primary/5 hover:border-primary">
                <div className="flex items-center justify-center w-14 h-14
                                rounded-full bg-gray-100 text-3xl text-gray-400
                                transition
                                group-hover:text-primary group-hover:bg-primary/15">
                  +
                </div>

                <span className="mt-4 text-sm font-medium text-gray-500
                                transition group-hover:text-primary">
                  Dodaj zwierzaka
                </span>
              </div>
            </Link>
            
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            Podsumowanie
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard/wizyty" className="transition hover:opacity-80">
              <StatsCard title="Wizyty" value={12} />
            </Link>

            <Link href="/dashboard/" className="transition hover:opacity-80">
              <StatsCard title="Przypomnienia" value={5} />
            </Link>

            <Link href="/dashboard/" className="transition hover:opacity-80">
              <StatsCard title="Notatki" value={8} />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <UserProfile user={user} />
      </AnimatedSection>

    </main>
  );
}
