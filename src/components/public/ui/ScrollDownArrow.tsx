'use client';

import { HiChevronDown } from 'react-icons/hi';

interface ScrollDownArrowProps {
  className?: string;
  targetId: string;
}

export default function ScrollDownArrow({ className, targetId }: ScrollDownArrowProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      console.warn(`Nie znaleziono elementu o ID: ${targetId}`);
    }
  };

  return (
    <div className="w-full flex justify-center mt-2">
      <div
        onClick={handleClick}
        className={`inline-flex flex-col items-center cursor-pointer group ${className || ''}`}
      >
        <span className="text-gray-600 mb-2 text-sm sm:text-base">
          Dowiedz się więcej
        </span>

        <HiChevronDown
          size={40}
          className="text-gray-600 animate-bounce"
        />
      </div>
    </div>
  );
}
