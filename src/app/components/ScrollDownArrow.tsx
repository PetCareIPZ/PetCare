'use client';

import { HiChevronDown } from 'react-icons/hi';

interface ScrollDownArrowProps {
  className?: string;
}

export default function ScrollDownArrow({ className }: ScrollDownArrowProps) {
  return (
    <div className={`flex flex-col items-center mt-2 animate-bounce cursor-pointer ${className || ''}`}>
      <span className="text-gray-600 mb-2 text-sm sm:text-base">Dowiedz się więcej</span>
      <HiChevronDown size={40} className="text-gray-600" />
    </div>
  );
}
