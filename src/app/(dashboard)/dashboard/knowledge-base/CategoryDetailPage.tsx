"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Clock, Search, CheckCircle2, Share2, Bookmark } from 'lucide-react';
import { categoryData } from './data';

interface DetailProps {
  categorySlug: string;
  initialSearch: string;
  onBack: () => void;
}

export default function CategoryDetailPage({ categorySlug, initialSearch, onBack }: DetailProps) {
  const [localSearch, setLocalSearch] = useState(initialSearch);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const data = (categoryData as any)[categorySlug];

  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  const toggleSave = (articleId: string) => {
    const newSaved = savedIds.includes(articleId) 
      ? savedIds.filter(id => id !== articleId) 
      : [...savedIds, articleId];
    setSavedIds(newSaved);
    localStorage.setItem('savedArticles', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('storage')); // Powiadom stronę główną
  };

  const filteredArticles = useMemo(() => {
    if (!data) return [];
    const searchLower = localSearch.toLowerCase();
    return data.articles.filter((art: any) =>
      art.title.toLowerCase().includes(searchLower) ||
      art.content.toLowerCase().includes(searchLower) ||
      art.points?.some((p: string) => p.toLowerCase().includes(searchLower))
    );
  }, [localSearch, data]);

  if (!data) return <div className="p-20 text-center font-bold">Kategoria nie istnieje.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Powrót
        </button>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-gray-400" /></div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="block w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            placeholder={`Szukaj w dziale ${data.title}...`}
          />
        </div>
      </div>

      <header className="mb-16">
        <div className={`inline-block px-4 py-1 rounded-full ${data.bg} ${data.color} text-xs font-bold uppercase tracking-widest mb-4 italic shadow-sm`}>Kategoria</div>
        <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">{data.title}</h1>
      </header>

      <div className="space-y-20">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article: any) => {
            const isSaved = savedIds.includes(article.id);
            return (
              <article key={article.id} className="group animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center space-x-3 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{article.readTime}</span>
                  <span className="text-gray-200">•</span>
                  <span>Aktualizacja 2026</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">{article.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">{article.content}</p>
                
                {article.points && (
                  <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm ring-1 ring-gray-50">
                    <h4 className="text-xs font-black text-gray-900 mb-4 uppercase tracking-widest">Warto wiedzieć:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {article.points.map((p: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-gray-600 leading-snug">
                          <CheckCircle2 className={`w-4 h-4 mr-3 mt-0.5 ${data.color} flex-shrink-0`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                  <button className="flex items-center text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                    <Share2 className="w-4 h-4 mr-2" /> Udostępnij
                  </button>
                  <button 
                    onClick={() => toggleSave(article.id)}
                    className={`flex items-center text-xs font-bold uppercase tracking-widest transition-all ${isSaved ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'}`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Zapisano' : 'Zapisz na później'}
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 italic text-gray-400">
            Brak wyników dla Twojego wyszukiwania. Spróbuj innego hasła.
          </div>
        )}
      </div>
    </div>
  );
}