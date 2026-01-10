'use client';

import React, { memo } from "react";
import { motion } from "framer-motion";
import ScrollDownArrow from "../ui/ScrollDownArrow";
import SignupCTA from '../ui/SignUpCta';
import Image from "next/image";
import dogImg from "public/img/dog.svg";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 py-24">

        {/* IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image 
            src={dogImg.src}
            height={500}
            width={500}
            unoptimized
            alt="Ilustracja psa"
            className="w-full max-w-md object-contain opacity-90"
            loading="lazy"
          />
        </motion.div>

        {/* TEXT / CTA */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Dołącz do PetCare
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-gray-600 max-w-lg leading-relaxed">
            Przypomnienia, wizyty i porady w jednym miejscu.
            Dbaj o swojego pupila łatwo i bez stresu.
          </p>

          <div className="mt-10">
            <SignupCTA />
          </div>
        </motion.div>

      </div>

      <ScrollDownArrow targetId="about" />
    </section>
  );
};

export default memo(Hero);
