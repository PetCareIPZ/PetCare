import { auth, currentUser } from "@clerk/nextjs/server";
import UserProfile from "./components/UserProfile";
import StatsCard from "./components/StatsCard";
import UserAnimalsCards from "./components/UserAnimalsCards";
import Link from "next/link";

export default async function DashboardPage() {
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20 text-red-400">
        <a href="/" style={{ textDecoration: "underline" }}>Zaloguj się</a> aby uzyskać dostęp do tej strony.
      </div>
    );
  }

  return (
    <main className="m-6">
        <h1 className="text-3xl font-bold mb-8 ">Witaj, {user?.firstName}!</h1>
        <section className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-8 p-8">
           <h2 className="text-3xl font-bold mb-8">
              Zwierzęta
          </h2>
          <div className="flex flex-wrap gap-6 w-full overflow-x-hidden">
            <UserAnimalsCards user={user}/>
            <Link href={"/dashboard/dodaj"}>
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border-2 border-dashed border-gray-300 w-64 h-60 p-4 cursor-pointer transition hover:border-gray-400 hover:bg-gray-50">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 text-4xl">
                  +
                </div>
                  <div className="mt-4 text-sm font-medium text-gray-500">
                    Dodaj Zwierzaka
                  </div>
              </div>
            </Link>
          </div>
        </section>
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard title="Wizyty" value={12} />
            <StatsCard title="Przypomnienia" value={5} />
            <StatsCard title="Notatki" value={8} />
        </section>
        <UserProfile user={user} />
    </main>

  );
}
