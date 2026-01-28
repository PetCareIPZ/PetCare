import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import {pets} from "~/server/db/schema";
export default async function wizyty() {
    const{userId}=await auth();
    async function Zwierz(uzytk:string) {
        if(!uzytk) return[];
        return db
        .select({
            petName:pets.petName
        })
        .from(pets)
        .where(eq(pets.userId, uzytk));

    }
    const pet=userId ? await Zwierz(userId) : [];
    const {isAuthenticated}=await auth()
    if(!isAuthenticated){
        return <div>Sign in to view this DashboardPage</div>
    }
    const user = await currentUser()
    return(
    <main>
        <section>
            <h1>Twoje wizyty {user?.firstName}</h1>
            <p>{pet.map((p) => p.petName).join(", ")}</p>
            <Link href={"/dashboard/visits/visits-registration"}>
            <p>Zarejestruj wizyte!!!</p>
            </Link>
        </section>
    </main>
    );
}
