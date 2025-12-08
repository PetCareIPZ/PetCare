import { auth, currentUser } from "@clerk/nextjs/server";
import UserProfile from "./components/UserProfile";
import StatsCard from "./components/StatsCard";

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
        <h1 className="text-3xl font-bold mb-8">Witaj, {user?.firstName}!</h1>
        <UserProfile user={user} />
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard title="Wizyty" value={12} />
            <StatsCard title="Przypomnienia" value={5} />
            <StatsCard title="Notatki" value={8} />
        </section>
    </main>

  );
}
