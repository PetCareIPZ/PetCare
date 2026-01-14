import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
export default async function wizyty() {
    const {isAuthenticated}=await auth()
    if(!isAuthenticated){
        return <div>Sign in to view this DashboardPage</div>
    }
    const user = await currentUser()
    return(
    <main>
        <section>
            <h1>Twoje wizyty {user?.firstName}</h1>
            <Link href={"/dashboard/wizyty/rejestracja_wizyt"}>
            <p>Zarejestruj wizyte!!!</p>
            </Link>
        </section>
    </main>
    );
}
