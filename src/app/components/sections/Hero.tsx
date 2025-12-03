'use client';

import React, { memo } from "react";
import { motion } from "framer-motion";
import ScrollDownArrow from "../ui/ScrollDownArrow";
import { CTABtn } from "../ui/CTAButton";

import dogImg from "public/img/dog.svg";

const SplitLogin = () => {
  return (
    <section className="bg-gray-50">
      <div className="mt-18"></div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row h-[90vh]">

        {/* SVG */}
        <motion.div
          className="w-full md:w-1/2 h-full flex justify-center items-center bg-gray-50"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-4/5 h-full flex justify-center items-center">
            <img
              src={dogImg.src}
              alt="Ilustracja psa"
              className="h-full w-full object-contain opacity-90"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start bg-gray-50 px-8 md:px-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-8xl font-bold text-gray-800 leading-tight">
            Dołącz do PetCare
          </h1>

          <p className="mt-6 text-lg md:text-4xl text-gray-600 max-w-md leading-relaxed">
            Przypomnienia, wizyty i porady w jednym miejscu.
            Dbaj o swojego pupila łatwo i bez stresu.
          </p>

          <div className="mt-10">
            <CTABtn action="sign-up" label="Dołącz do PetCare" />
          </div>
        </motion.div>
      </div>

      <ScrollDownArrow targetId="about" />

    </section>
  );
};

export default memo(SplitLogin);
