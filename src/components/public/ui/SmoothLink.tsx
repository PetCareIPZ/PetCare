'use client';

import Link from "next/link";

import type { LinkProps } from "next/link";
import type { ReactNode, MouseEvent } from "react";

interface SmoothLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function SmoothLink({ href, children, className, ...props }: SmoothLinkProps) {

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof href === "string" && href.startsWith('#')) {
      e.preventDefault();

      const id = href.substring(1);
      const element = document.getElementById(id);

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      } else {
        console.warn(`Nie znaleziono elementu o ID: ${id}`);
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
