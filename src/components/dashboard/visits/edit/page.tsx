// app/dashboard/visits/edit/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getVisitForUser } from "~/server/animal/animal.service"; // Musisz dopisać tę funkcję
import EditVisitForm from "../EditVisitForm";

export default async function EditVisitPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ id?: string }> 
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const params = await searchParams;
  if (!params.id) redirect("/dashboard/visits");

  const visit = await getVisitForUser(Number(params.id), userId);
  if (!visit) redirect("/dashboard/visits");

  return <EditVisitForm initialData={visit} />;
}