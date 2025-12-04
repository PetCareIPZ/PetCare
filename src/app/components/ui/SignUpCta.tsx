'use client';

import { motion } from 'framer-motion';
import { SignUpButton } from '@clerk/nextjs';
import { PawPrint } from 'lucide-react';
import { useState } from 'react';

export default function SignupCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <SignUpButton mode="modal">
      <motion.button
        className="text-1xl bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 cursor-pointer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <span>Dołącz do PetCare</span>

        {/* Łapka z rotacją przy hoverze i stałym y = -2 */}
        <motion.div
          className="w-5 h-5"
          animate={hovered ? { rotate: [-10, 5, -10], y: -2 } : { rotate: 0, y: -2 }}
          transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, repeatType: 'mirror' }}
        >
          <PawPrint />
        </motion.div>
      </motion.button>
    </SignUpButton>
  );
}
