import { db } from "~/server/db";
import { pets } from "~/server/db/schema";
import { eq } from "drizzle-orm";


export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const item = await db.select({name: pets.petName}).from(pets).where(eq(pets.petId, parseInt(params.id)));

  return (
    <>
      <nav className="breadcrumbs">
        <a href="/dashboard">Dashboard</a>
        <span>/</span>
        <span>{item[0]?.name}</span>
      </nav>

      {children}
    </>
  );
}