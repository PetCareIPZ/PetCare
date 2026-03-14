"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDrug } from "~/server/animal/animal.service";
import type { PetOption } from "~/types/animal";
import { defaultColors } from "~/components/Icon";

export default function AddDrugForm({ pets }: { pets: PetOption[] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const primaryColor = defaultColors.pills;
    const focusRing = primaryColor.replace('1)', '0.2)');

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

    const labelStyle = "block text-gray-700 font-semibold mb-2";
    const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition bg-white";

    return (
        <div className="w-full py-8 px-4">
            <div className="max-w-2xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Dodaj lek / preparat</h1>
            </div>

            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-8"
            >
                <div>
                    <label htmlFor="petId" className={labelStyle}>Wybierz pacjenta *</label>
                    <select name="petId" id="petId" required className={inputStyle} defaultValue="">
                        <option value="" disabled>-- Wybierz zwierzaka --</option>
                        {pets.map(p => (
                            <option key={p.petId} value={p.petId}>{p.petName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="drugType" className={labelStyle}>Nazwa leku / preparatu *</label>
                    <input 
                        type="text" 
                        name="drugType" 
                        id="drugType" 
                        required 
                        placeholder="np. Bravecto, kropelki do oczu" 
                        className={inputStyle} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="drugDate" className={labelStyle}>Data podania *</label>
                        <input 
                            type="date" 
                            name="drugDate" 
                            id="drugDate" 
                            required 
                            defaultValue={new Date().toISOString().split('T')[0]} 
                            className={inputStyle} 
                        />
                    </div>
                    <div>
                        <label htmlFor="drugDose" className={labelStyle}>Dawka *</label>
                        <input 
                            type="text" 
                            name="drugDose" 
                            id="drugDose" 
                            required 
                            placeholder="np. 1 tabletka, 5 ml" 
                            className={inputStyle} 
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="drugNote" className={labelStyle}>Dodatkowe notatki</label>
                    <textarea 
                        name="drugNote" 
                        id="drugNote" 
                        rows={3} 
                        placeholder="Opcjonalne uwagi..." 
                        className={`${inputStyle} h-auto min-h-[100px]`}
                    ></textarea>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
                    <button 
                        type="button" 
                        onClick={() => router.back()} 
                        className="w-full sm:w-auto px-10 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition text-center"
                    >
                        Anuluj
                    </button>
                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        style={{ backgroundColor: primaryColor }}
                        className="w-full sm:w-auto text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-md shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Zapisywanie..." : "Zapisz lek"}
                    </button>
                </div>
            </form>

            {/* Dynamiczny styl focus oparty na kolorze 'pills' */}
            <style jsx>{`
                input:focus, select:focus, textarea:focus {
                    box-shadow: 0 0 0 4px ${focusRing};
                    border-color: ${primaryColor} !important;
                }
            `}</style>
        </div>
    );
}