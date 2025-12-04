'use client';

import React from "react";
import { User, PawPrint, CalendarCheck, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
    step: "0",
    title: "Rejestracja",
    desc: "Załóż konto w aplikacji PetCare, aby zacząć dbać o swojego pupila.",
    icon: <User className="w-6 h-6 text-white" />,
    color: "bg-blue-500"
  },
  {
    step: "1",
    title: "Dodaj swojego pupila",
    desc: "Wprowadź podstawowe informacje o swoim zwierzaku – imię, rasę, wiek i najważniejsze dane zdrowotne.",
    icon: <PawPrint className="w-6 h-6 text-white" />,
    color: "bg-primary"
  },
  {
    step: "2",
    title: "Zarządzaj wizytami",
    desc: "Twórz przypomnienia o szczepieniach, wizytach u weterynarza i podawaniu leków – już nigdy niczego nie przegapisz.",
    icon: <CalendarCheck className="w-6 h-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    step: "3",
    title: "Otrzymuj porady",
    desc: "Dostosowane do potrzeb Twojego zwierzaka wskazówki i powiadomienia pomogą Ci lepiej o niego dbać.",
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    color: "bg-orange-500"
  }
];

export default function Proccess() {
  return (
    <section className="py-20 bg-white relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Pierwsze kroki w aplikacji
        </h2>

        <div className="relative">

          {/* pionowa linia (desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="mb-12 flex flex-col md:flex-row md:justify-between items-center relative min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* karta */}
              <div
                className={`w-full md:w-5/12 p-6 rounded-2xl shadow-md bg-gray-50 min-w-0 ${
                  i % 2 === 0 ? "md:text-left md:ml-auto" : "md:text-right md:mr-auto"
                }`}
              >
                <div className={`flex items-center mb-2 ${i % 2 !== 0 ? "justify-end" : ""}`}>
                  
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${s.color} mr-3`}>
                    {s.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {s.title}
                  </h3>
                </div>

                <p className="text-gray-600">{s.desc}</p>
              </div>

              {/* punkt A/B/C */}
              <div className="absolute md:left-1/2 left-0 md:transform md:-translate-x-1/2 -translate-x-0 
                              w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center 
                              text-white font-bold mt-4 md:mt-0">
                {s.step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
