'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SmoothLink({ href, children, className }: any) {
  const router = useRouter();

  const handleClick = (e: any) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        console.warn(`Nie znaleziono elementu o ID: ${targetId}`);
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
