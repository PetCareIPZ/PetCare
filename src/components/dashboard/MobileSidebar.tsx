'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { href: '/dashboard', label: 'Przegląd', icon: '📊' },
  { href: '/dashboard/zwierzaki', label: 'Zwierzaki', icon: '🐾' },
  { href: '/dashboard/wizyty', label: 'Wizyty', icon: '📅' },
  { href: '/dashboard/leki', label: 'Leki', icon: '💊' },
  { href: '/dashboard/przypomnienia', label: 'Przypomnienia', icon: '🔔' },
  { href: '/dashboard/bazawiedzy', label: 'Baza Wiedzy', icon: '📚' },
  { href: '/dashboard/ustawienia', label: 'Ustawienia Konta', icon: '⚙️' },
  { href: '/dashboard/placowki', label: 'Placówki Blisko Ciebie', icon: '📍' },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/80 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition md:hidden"
        aria-label="Menu"
      >
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="space-y-2 p-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 font-medium ${
                isActive(item.href)
                  ? 'bg-white text-black shadow-md border border-gray-300'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
