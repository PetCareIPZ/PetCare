"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateVacc, deleteVacc } from "~/server/animal/animal.service";
import type { PetOption } from "~/types/animal";
import { defaultColors } from "~/components/Icon";
import { ArrowLeft,Trash2, CheckCircle2, Loader2 } from 'lucide-react'; // Dodaj te ikony
import Link from "next/link";

interface VaccData {
    vaccId: number;
    petId: number;
    vaccType: string;
    vaccDate: string;
    vaccDose: string;
    vaccNote: string | null;
}

export default function EditVaccinationForm({ pets, initialData }: { pets: PetOption[], initialData: VaccData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const primaryColor = defaultColors.syringe;
    const focusRing = primaryColor.replace('rgb', 'rgba').replace(')', ', 0.2)');

    // Logika usuwania
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteVacc(initialData.vaccId, initialData.petId);
            setIsDeleted(true);
            
            setTimeout(() => {
                router.replace("/dashboard/vaccinations");
            }, 4000);
        } catch (error) {
            console.error(error);
            alert("Wystąpił błąd przy usuwaniu.");
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        
        try {
            await updateVacc({
                vaccId: initialData.vaccId,
                petId: initialData.petId,
                vaccType: formData.get("vaccType") as string,
                vaccDate: formData.get("vaccDate") as string,
                vaccDose: formData.get("vaccDose") as string,
                vaccNote: formData.get("vaccNote") as string,
            });
            router.refresh();
            router.push("/dashboard/vaccinations");
        } catch (error) {
            alert("Błąd przy zapisie.");
            setIsLoading(false);
        }
    };

    // --- EKRAN SUKCESU (z Twojego przykładu) ---
    if (isDeleted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 font-sans">
                <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <CheckCircle2 className="w-12 h-12 animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Usunięto!</h2>
                    <p className="text-gray-500">
                        Szczepienie zostało pomyślnie usunięte. Zaraz wrócisz do listy...
                    </p>
                </div>
            </div>
        );
    }

    const labelStyle = "block text-gray-700 font-semibold mb-2";
    const inputStyle = "w-full p-3 border border-gray-300 rounded-lg outline-none transition bg-white";

    return (
        <div className="w-full py-8 px-4">
            <div className="max-w-2xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Edytuj szczepienie</h1>
            </div>

            {/* Nawigacja */}
            <div className="max-w-2xl mx-auto mb-6 flex justify-start">
            <Link 
                href="/dashboard/vaccinations" 
                className="inline-flex items-center gap-2 px-4 py-2 text-blue-700 bg-blue-100 rounded-full font-medium hover:bg-blue-200 transition group"
            >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Powrót</span>
            </Link>
            </div>

            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-8"
            >
                {/* Wybór pacjenta (zablokowany w edycji) */}
                <div>
                    <label htmlFor="petId" className={labelStyle}>Pacjent</label>
                    <select 
                        id="petId" 
                        disabled 
                        className={`${inputStyle} bg-gray-50 opacity-70 cursor-not-allowed`}
                        defaultValue={initialData.petId}
                    >
                        {pets.map(p => (
                            <option key={p.petId} value={p.petId}>{p.petName}</option>
                        ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">Nie można zmienić przypisanego zwierzaka.</p>
                </div>

                <div>
                    <label htmlFor="vaccType" className={labelStyle}>Nazwa szczepionki *</label>
                    <input 
                        type="text" 
                        name="vaccType" 
                        id="vaccType" 
                        required 
                        defaultValue={initialData.vaccType}
                        className={inputStyle} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="vaccDate" className={labelStyle}>Data podania *</label>
                        <input 
                            type="date" 
                            name="vaccDate" 
                            id="vaccDate" 
                            required 
                            defaultValue={new Date(initialData.vaccDate).toISOString().split('T')[0]} 
                            className={inputStyle} 
                        />
                    </div>
                    <div>
                        <label htmlFor="vaccDose" className={labelStyle}>Dawka *</label>
                        <input 
                            type="text" 
                            name="vaccDose" 
                            id="vaccDose" 
                            required 
                            defaultValue={initialData.vaccDose}
                            className={inputStyle} 
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="vaccNote" className={labelStyle}>Dodatkowe notatki</label>
                    <textarea 
                        name="vaccNote" 
                        id="vaccNote" 
                        rows={3} 
                        defaultValue={initialData.vaccNote ?? ""}
                        className={`${inputStyle} h-auto min-h-[100px]`}
                    ></textarea>
                </div>

                {/* --- PRZYCISKI (z dodanym Usuń) --- */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-100 pt-8">
                    <button 
                        type="button" 
                        onClick={() => setShowConfirm(true)}
                        disabled={isLoading || isDeleting}
                        className="px-14 py-4 text-red-500 font-bold hover:bg-red-50 rounded-xl transition flex items-center justify-center gap-2"
                    >
                       <Trash2 size={18} /> Usuń wpis
                    </button>

                        <button 
                            type="submit" 
                            disabled={isLoading || isDeleting} 
                            style={{ backgroundColor: primaryColor }}
                            className="text-white font-bold py-4 px-14 rounded-xl transition hover:opacity-90 shadow-md disabled:opacity-50 flex items-center justify-center min-w-[200px]"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Zapisz zmiany"}
                        </button>
                
                </div>
            </form>

            {/* --- MODAL POTWIERDZENIA (z Twojego przykładu) --- */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Na pewno?</h2>
                        <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
                            To szczepienie zostanie trwale usunięte. Czy chcesz kontynuować?
                        </p>
                        
                        <div className="flex gap-3">
                            <button
                                disabled={isDeleting}
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition disabled:opacity-50"
                            >
                                Anuluj
                            </button>
                            <button
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-100 disabled:opacity-50 flex items-center justify-center"
                            >
                                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Usuń"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                input:focus, select:focus, textarea:focus {
                    box-shadow: 0 0 0 4px ${focusRing};
                    border-color: ${primaryColor} !important;
                }
            `}</style>
        </div>
    );
}