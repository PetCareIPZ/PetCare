import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import {pets} from "~/server/db/schema";
export default async function wizyty() {
    const pett_1=await db.select({
        
    })
    const result=await db.select({
    field1:visits.visitDate
    }).from(visits);
    const field1= result[0]?.field1;
    const {isAuthenticated}=await auth()
    if(!isAuthenticated){
        return <div>Sign in to view this DashboardPage</div>
    }
    const user = await currentUser()
    return(
    <main>
        <section>
            <h1>Twoje wizyty {user?.firstName}</h1>
            <p>{field1}</p>
            <Link href={"/dashboard/wizyty/rejestracja_wizyt"}>
            <p>Zarejestruj wizyte!!!</p>
            </Link>
        </section>
    </main>
    );
}
