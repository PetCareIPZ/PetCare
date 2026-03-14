'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '~/components/Icon';

const menuItems = [
  { href: '/dashboard', label: 'Przegląd', icon: <Icon name="chart" /> },
  { href: '/dashboard/animals', label: 'Zwierzaki', icon: <Icon name="paw" /> },
  { href: '/dashboard/visits', label: 'Wizyty', icon: <Icon name="calendar" /> },
  { href: '/dashboard/drugs', label: 'Leki', icon: <Icon name="pills" /> },
  { href: '/dashboard/vaccinations', label: 'Szczepienia', icon: <Icon name="syringe" /> },
  { href: '/dashboard/reminders', label: 'Przypomnienia', icon: <Icon name="bell" /> },
  { href: '/dashboard/knowledge-base', label: 'Baza Wiedzy', icon: <Icon name="book" /> },
  { href: '/dashboard/settings', label: 'Ustawienia Konta', icon: <Icon name="cog" /> },
  { href: '/dashboard/facilities', label: 'Placówki Blisko Ciebie', icon: <Icon name="map" /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <div className="hidden md:block w-64 flex-shrink-0" />

      <aside className="hidden md:block w-64 bg-white shadow-md rounded-lg p-6 fixed top-1/2 -translate-y-1/2 z-[1001] h-fit ml-0">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
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