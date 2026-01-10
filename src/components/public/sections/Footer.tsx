'use client';

import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-gray-50 py-10 relative"
      style={{ boxShadow: '0 -7px 29px rgba(100, 100, 111, 0.2)' }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm flex justify-center items-center gap-1">
        {/* Data */}
        <span>© {new Date().getFullYear()}</span>

        {/* Nazwa klikalna */}
        <span
          onClick={scrollToTop}
          className="cursor-pointer font-semibold text-gray-800 hover:text-primary transition-colors mx-1"
        >
          PetCare
        </span>

        <span>• Wszelkie prawa zastrzeżone.</span>
      </div>
    </footer>
  );
}

{/* <a href="https://storyset.com/animal">Animal illustrations by Storyset</a> */}