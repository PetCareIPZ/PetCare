"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, HeartPulse, GraduationCap, Utensils, Info, Bookmark, X, ArrowRight } from 'lucide-react';
import Icon from '~/components/Icon';
import CategoryDetailPage from './CategoryDetailPage';
import { categoryData } from './data';
import AnimatedSection from "~/components/public/ui/AnimatedSection";

const categories = [
  { id: "zdrowie", title: "Zdrowie i profilaktyka", description: "Informacje o szczepieniach, odrobaczaniu i typowych dolegliwościach.", icon: <HeartPulse className="w-8 h-8 text-red-500" /> },
  { id: "zywienie", title: "Żywienie", description: "Jak dobrać karmę i jakich produktów unikać w diecie pupila.", icon: <Utensils className="w-8 h-8 text-orange-500" /> },
  { id: "trening", title: "Wychowanie i trening", description: "Porady dotyczące behawiorystyki, nauki czystości i komend.", icon: <GraduationCap className="w-8 h-8 text-blue-500" /> },
  { id: "opieka", title: "Opieka ogólna", description: "ABC pielęgnacji sierści, pazurów oraz przygotowanie domu na zwierzaka.", icon: <BookOpen className="w-8 h-8 text-green-500" /> }
];

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedArticles, setSavedArticles] = useState<any[]>([]);

  const refreshSavedArticles = () => {
    const savedIdsString = localStorage.getItem('savedArticles');
    if (savedIdsString) {
      const savedIds = JSON.parse(savedIdsString);
      const allArticles: any[] = [];
      
      Object.values(categoryData).forEach((cat: any) => {
        cat.articles.forEach((art: any) => {
          if (savedIds.includes(art.id)) {
            allArticles.push({ ...art, categoryTitle: cat.title, categorySlug: Object.keys(categoryData).find(key => (categoryData as any)[key] === cat) });
          }
        });
      });
      setSavedArticles(allArticles);
    } else {
      setSavedArticles([]);
    }
  };

  useEffect(() => {
    refreshSavedArticles();
    window.addEventListener('storage', refreshSavedArticles);
    return () => window.removeEventListener('storage', refreshSavedArticles);
  }, [activeCategory]);

  const removeSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentSaved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const newSaved = currentSaved.filter((savedId: string) => savedId !== id);
    localStorage.setItem('savedArticles', JSON.stringify(newSaved));
    refreshSavedArticles();
  };

  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const searchLower = searchTerm.toLowerCase();
      const categoryMatch = category.title.toLowerCase().includes(searchLower) || category.description.toLowerCase().includes(searchLower);
      const content = (categoryData as any)[category.id];
      const articleMatch = content?.articles.some((art: any) => 
        art.title.toLowerCase().includes(searchLower) || art.content.toLowerCase().includes(searchLower)
      );
      return categoryMatch || articleMatch;
    });
  }, [searchTerm]);

  if (activeCategory) {
    return (
      <CategoryDetailPage 
        categorySlug={activeCategory} 
        initialSearch={searchTerm} 
        onBack={() => {
          setActiveCategory(null);
          setSearchTerm("");
        }} 
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Nagłówek i Wyszukiwarka */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Icon name="book" /> Baza Wiedzy
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-light italic">Wszystko dla zdrowia i szczęścia Twojego pupila.</p>
          
          <AnimatedSection delay={0.1}>
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-blue-500 transition-colors">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
              placeholder="Szukaj porad (np. kleszcz, siad, karma...)"
            />
          </div>
          </AnimatedSection>
        </div>

      {/* --- SEKCJA: ZAPISANE ARTYKUŁY --- */}
      {savedArticles.length > 0 && !searchTerm && (
        <AnimatedSection delay={0.1}>
          <section className="mb-16">
            <div className="flex items-center space-x-2 mb-6 text-blue-900">
              <Bookmark className="w-5 h-5 fill-current" />
              <h2 className="text-xl font-bold uppercase tracking-wider text-sm">Twoje zapisane porady ({savedArticles.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => {
                    setSearchTerm(art.title);
                    setActiveCategory(art.categorySlug);
                  }}
                  className="group relative p-5 bg-blue-50/50 border border-blue-100 rounded-2xl cursor-pointer hover:bg-white hover:shadow-md transition-all border-l-4 border-l-blue-500"
                >
                  <button 
                    onClick={(e) => removeSaved(art.id, e)}
                    className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tight">{art.categoryTitle}</span>
                  <h3 className="font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors line-clamp-1">{art.title}</h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{art.content}</p>
                  <div className="mt-3 flex items-center text-[10px] font-bold text-blue-600 uppercase">
                    Czytaj teraz <ArrowRight className="ml-1 w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.2}>
        <hr className="my-12 border-gray-200" />

        {/* Siatka Kategorii */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="group p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex items-start space-x-4 text-left w-full"
            >
              <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-white transition-colors flex-shrink-0">
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{category.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                {searchTerm && <p className="mt-3 text-[10px] text-blue-500 font-bold uppercase tracking-wider">Znaleziono pasujące treści</p>}
              </div>
            </button>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}