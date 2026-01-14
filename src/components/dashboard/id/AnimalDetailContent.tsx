'use client';

import Link from "next/link";
import { useState } from "react";
import deleteAnimalHandler  from "~/components/dashboard/id/AnimalDeletionHandler";

interface deleteAnimalProps {
    animal: any;
}

export default function AnimalDetailContent(data : deleteAnimalProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const petData = data;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 py-8">
                <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
                    ← Powrót
                </Link>
                
                <div className="bg-slate-700 rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center justify-center">
                            <img 
                                src={petData?.animal.imageUrl} 
                                alt={petData?.animal.petName}
                                className="rounded-lg w-full max-w-sm h-auto object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-6">{petData?.animal.petName}</h1>
                            
                            <div className="space-y-4 text-gray-200">
                                <div className="flex justify-between border-b border-slate-600 pb-2">
                                    <span className="font-semibold">Gatunek:</span>
                                    <span>{petData?.animal.species}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-slate-600 pb-2">
                                    <span className="font-semibold">Rasa:</span>
                                    <span>{petData?.animal.race}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-slate-600 pb-2">
                                    <span className="font-semibold">Płeć:</span>
                                    <span>{petData?.animal.sex}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-slate-600 pb-2">
                                    <span className="font-semibold">Data urodzenia:</span>
                                    <span>{petData?.animal.birthDate}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-slate-600 pb-2">
                                    <span className="font-semibold">Waga:</span>
                                    <span>{petData?.animal.weight} kg</span>
                                </div>

                                {petData?.animal.chipNumber && (
                                    <div className="flex justify-between border-b border-slate-600 pb-2">
                                        <span className="font-semibold">Numer Chipa:</span>
                                        <span>{petData?.animal.chipNumber}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between border-b border-slate-600 pb-2">
                                    <span className="font-semibold">Data dodania:</span>
                                    <span>{new Date(petData?.animal.createdAt!).toLocaleDateString('pl-PL')}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edytuj
                                </button>
                                <button 
                                    onClick={() => setShowConfirm(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Usuń
                                </button>
                            </div>
                            {showConfirm && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-slate-700 rounded-lg p-6 max-w-sm shadow-lg">
                                        <h2 className="text-xl font-bold text-white mb-4">Potwierdzenie usunięcia</h2>
                                        <p className="text-gray-200 mb-6">
                                            Czy na pewno chcesz usunąć zwierzę <strong>{petData?.animal.petName}</strong>? Ta operacja nie może być cofnięta.
                                        </p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setShowConfirm(false)}
                                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Anuluj
                                            </button>
                                            <button
                                                onClick={deleteAnimalHandler.bind(null, petData?.animal.userId, petData?.animal.petId)}
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Usuń
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
