'use client';

import { useState, useEffect } from 'react';
import { HiChevronUp } from 'react-icons/hi';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY >150);
    window.addEventListener('scroll', handleScroll);

    handleScroll(); // sprawdzenie przy pierwszym renderze

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#cc66ff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)', // animacja wchodzenia z dołu
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cc66ff')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c352fcff')}
      aria-label="Scroll to top"
    >
      <HiChevronUp size={24} />
    </button>
  );
}
