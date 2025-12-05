'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SignInBtn, SignUpBtn } from '../ui/AuthButtons';
import SmoothLink from '../ui/SmoothLink';

export default function Nav() {
  return (
    <header
      className="fixed top-0 left-0 w-full h-16 bg-white z-50 flex justify-between items-center px-6"
      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
    >
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer">PetCare</h1>
      </Link>

      {/* Linki na środku */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8 text-lg">
        <SmoothLink href="#about" className="hover:text-blue-600 transition">
          O nas
        </SmoothLink>
        <SmoothLink href="#proccess" className="hover:text-blue-600 transition">
          Proces
        </SmoothLink>
        <SmoothLink href="#proccess" className="hover:text-blue-600 transition">
          Link3
        </SmoothLink>
      </nav>

      {/* Logowanie */}
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInBtn />
          <SignUpBtn />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
