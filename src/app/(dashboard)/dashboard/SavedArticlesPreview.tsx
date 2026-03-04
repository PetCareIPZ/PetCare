"use client";

import React, { useState, useEffect } from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { categoryData } from '~/app/(dashboard)/dashboard/knowledge-base/data';
import type { Category, SavedArticle } from '~/types/knowledge-base';

export default function SavedArticlesPreview() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedIdsString = localStorage.getItem('savedArticles');
    if (savedIdsString) {
      try {
        const savedIds = JSON.parse(savedIdsString) as string[];
        const allArticles: SavedArticle[] = [];
        const data = categoryData as Record<string, Category>;
        
        Object.entries(data).forEach(([slug, cat]) => {
          cat.articles.forEach((art) => {
            if (savedIds.includes(art.id)) {
              allArticles.push({ 
                ...art, 
                categoryTitle: cat.title, 
                categorySlug: slug 
              });
            }
          });
        });
        // Wyświetlamy tylko 3 ostatnio zapisane na dashboardzie
        setSavedArticles(allArticles.slice(-3).reverse());
      } catch (e) {
        console.error("Error parsing saved articles", e);
      }
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded || savedArticles.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-gray-800">
          <Bookmark className="w-5 h-5 fill-purple-600 text-purple-600" />
          <h2 className="text-2xl font-semibold">Zapisane porady</h2>
        </div>
        <Link href="/dashboard/knowledge-base" className="text-sm text-purple-600 hover:underline">
          Zobacz wszystkie
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savedArticles.map((art) => (
          <Link 
            key={art.id}
            href={`/dashboard/knowledge-base`}
            className="group p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-purple-500"
          >
            <span className="text-[10px] font-bold text-purple-400 uppercase">{art.categoryTitle}</span>
            <h3 className="font-bold text-gray-900 mt-1 group-hover:text-purple-600 transition-colors line-clamp-1">
              {art.title}
            </h3>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
              {art.content}
            </p>
            <div className="mt-3 flex items-center text-[10px] font-bold text-purple-600 uppercase">
              Czytaj dalej <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}