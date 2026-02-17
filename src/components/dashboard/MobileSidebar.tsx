'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icon from '~/components/Icon';

const menuItems = [
  { href: '/dashboard', label: 'Przegląd', icon: <Icon name="chart" /> },
  { href: '/dashboard/animals', label: 'Zwierzaki', icon: <Icon name="paw" /> },
  { href: '/dashboard/visits', label: 'Wizyty', icon: <Icon name="calendar" /> },
  { href: '/dashboard/drugs', label: 'Leki', icon: <Icon name="pills" /> },
  { href: '/dashboard/reminders', label: 'Przypomnienia', icon: <Icon name="bell" /> },
  { href: '/dashboard/knowledge-base', label: 'Baza Wiedzy', icon: <Icon name="book" /> },
  { href: '/dashboard/settings', label: 'Ustawienia Konta', icon: <Icon name="cog" /> },
  { href: '/dashboard/facilities', label: 'Placówki Blisko Ciebie', icon: <Icon name="map" /> },
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
        className="fixed bottom-6 right-6 z-1001 bg-primary hover:bg-primary/80 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition md:hidden"
        aria-label="Menu"
      >
        {isOpen ? (
          <Icon name="xmark" className="w-6 h-6" />
        ) : (
          <Icon name="bars" className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-1001 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 md:hidden z-[1001] ${
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
