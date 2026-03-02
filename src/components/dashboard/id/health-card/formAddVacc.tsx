'use client';
import { useRouter } from "next/navigation";
import formAddVaccHandler from "./formAddVaccHandler";


export function AddVaccForm({petId}: {petId: string}){
    const router = useRouter();
    return (
        <div className="flex items-center justify-center py-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-3xl px-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
                Dodaj szczepienie
                </h1>
        
                <form
                action={formAddVaccHandler}
                className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6 transition hover:shadow-lg"
                >
                <input type="hidden" name="petId" value={petId} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nazwa szczepienia
                    </label>
                    <input
                    name="vaccType"
                    type="text"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="np. Parvoviroza, Nosówka, Wścieklizna"
                    maxLength={255}
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data szczepienia
                    </label>
                    <input
                    name="vaccDate"
                    type="date"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                    />
                </div>
        
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dawka szczepienia
                    </label>
                    <input
                    name="vaccDose"
                    type="text"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="np. 1 tabletka, 2 ml, 0.5 mg"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notatka (opcjonalna)
                    </label>
                    <input
                    name="vaccNote"
                    type="text"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 items-center justify-center">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition shadow"
                        >
                        Wyślij
                    </button>
                    <button className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition" onClick={router.back}>
                        Odrzuć
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}