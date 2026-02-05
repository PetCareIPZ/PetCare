import React from 'react';
import { Search, BookOpen, HeartPulse, GraduationCap, Utensils, Info } from 'lucide-react';

// Przykładowe dane
const categories = [
  {
    title: "Zdrowie i profilaktyka",
    description: "Informacje o szczepieniach, odrobaczaniu i typowych dolegliwościach.",
    icon: <HeartPulse className="w-8 h-8 text-red-500" />,
    link: "/knowledge-base/zdrowie"
  },
  {
    title: "Żywienie",
    description: "Jak dobrać karmę i jakich produktów unikać w diecie pupila.",
    icon: <Utensils className="w-8 h-8 text-orange-500" />,
    link: "/knowledge-base/zywienie"
  },
  {
    title: "Wychowanie i trening",
    description: "Porady dotyczące behawiorystyki, nauki czystości i komend.",
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    link: "/knowledge-base/trening"
  },
  {
    title: "Opieka ogólna",
    description: "ABC pielęgnacji sierści, pazurów oraz przygotowanie domu na zwierzaka.",
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    link: "/knowledge-base/opieka"
  }
];

export default function KnowledgeBasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Nagłówek i Wyszukiwarka */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Baza Wiedzy</h1>
        <p className="text-lg text-gray-600 mb-8">
          Wszystko, co musisz wiedzieć, aby Twój pupil był szczęśliwy i zdrowy.
        </p>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Szukaj porad (np. jak karmić kota, szczepienia psa...)"
          />
        </div>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* Siatka Kategorii */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="group p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex items-start space-x-4"
          >
            <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-white transition-colors">
              {category.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Sekcja "Szybka pomoc" */}
      <div className="mt-16 bg-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-blue-100 p-3 rounded-full">
            <Info className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-900">Nie znalazłeś odpowiedzi?</h4>
            <p className="text-blue-700">Skontaktuj się z naszym weterynarzem przez czat.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          Zadaj pytanie
        </button>
      </div>
    </div>
  );
}