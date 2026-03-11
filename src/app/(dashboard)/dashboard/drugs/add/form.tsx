"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDrug } from "~/server/animal/animal.service";
import type { PetOption } from "~/types/animal";

export default function AddDrugForm({ pets }: { pets: PetOption[] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        
        const drugData = {
            petId: Number(formData.get("petId")),
            drugType: formData.get("drugType") as string,
            drugDate: formData.get("drugDate") as string,
            drugDose: formData.get("drugDose") as string,
            drugNote: formData.get("drugNote") as string,
        };

        try {
            await addDrug(drugData);
            router.refresh();
            router.push("/dashboard/drugs");
        } catch (error) {
            console.error(error);
            alert("Wystąpił błąd przy zapisie. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-5 sm:gap-6">
            <div>
                <label htmlFor="petId" className="block text-gray-700 font-semibold mb-2">Wybierz pacjenta *</label>
                <select name="petId" id="petId" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="">
                    <option value="" disabled>-- Wybierz zwierzaka --</option>
                    {pets.map(p => (
                        <option key={p.petId} value={p.petId}>{p.petName}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="drugType" className="block text-gray-700 font-semibold mb-2">Nazwa leku / preparatu *</label>
                <input type="text" name="drugType" id="drugType" required placeholder="np. Bravecto, kropelki do oczu" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="drugDate" className="block text-gray-700 font-semibold mb-2">Data podania *</label>
                    <input type="date" name="drugDate" id="drugDate" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label htmlFor="drugDose" className="block text-gray-700 font-semibold mb-2">Dawka *</label>
                    <input type="text" name="drugDose" id="drugDose" required placeholder="np. 1 tabletka, 5 ml" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
            </div>

            <div>
                <label htmlFor="drugNote" className="block text-gray-700 font-semibold mb-2">Dodatkowe notatki</label>
                <textarea name="drugNote" id="drugNote" rows={3} placeholder="Opcjonalne uwagi..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button type="button" onClick={() => router.back()} className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                    Anuluj
                </button>
                <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 transition">
                    {isLoading ? "Zapisywanie..." : "Dodaj lek"}
                </button>
            </div>
        </form>
    );
}