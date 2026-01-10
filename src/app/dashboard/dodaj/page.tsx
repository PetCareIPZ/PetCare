import Link from "next/link";
import Form from "next/form";
import { addAnimal } from "./components/addAnimal";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function dodajPage(){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-20 text-red-400">
            <Link href="href"> <a style={{ textDecoration: "underline" }}>Zaloguj się</a><a> aby uzyskać dostęp do tej strony</a></Link> 
            </div>
        );
    }
    
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold text-gray-900"> Formularz dodania Zwierzaka </h1>
            <Form action={addAnimal} className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imie zwierzaka
                    </label>
                    <input
                    name="imie"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="np. Nela"
                    required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Urodzenia
                    </label>
                    <input
                    name="data-urodzenia"
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gatunek
                    </label>
                    <input
                    name="gatunek"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="np. Pies, Kot"
                    required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rasa
                    </label>
                    <input
                    name="rasa"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="np. Yorkshire Terrier, Labrador"
                    required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Płeć
                    </label>
                    <select
                    name="plec" className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400" required
                    >
                    <option value="">Wybierz płeć</option>
                    <option value="samiec">Samiec</option>
                    <option value="samica">Samica</option>
                    <option value="jednopłciowy">jednopłciowy</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waga (kg)
                    </label>
                    <input
                    name="waga"
                    type="number"
                    min="0.1"
                    step="0.1"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="np. 3.5"
                    required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numer chipu
                    </label>
                    <input
                    name="czip"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="15-cyfrowy numer chipu"
                    maxLength={15}
                    required
                    />
                </div>
                <div className="flex flex-row-reverse justify-start gap-3 pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
                        >
                        Wyślij
                    </button>

                    <Link href={"/dashboard"}>
                         <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                            Odrzuć
                         </button>
                    </Link>
                </div>
            </Form>
        </div>

    )
}