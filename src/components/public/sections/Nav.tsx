'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SignInBtn, SignUpBtn } from '../ui/AuthButtons';
import SmoothLink from '../ui/SmoothLink';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full h-16 bg-white z-50 flex justify-between items-center px-6"
      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
    >
      {/* Logo */}
      <Link href="/" onClick={closeMenu}>
        <h1 className="text-2xl font-bold cursor-pointer">PetCare</h1>
      </Link>

      {/* Linki na środku - Desktop */}
      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-lg">
        <SmoothLink href="#about" className="hover:text-secondary transition">
          O nas
        </SmoothLink>
        <SmoothLink href="#proccess" className="hover:text-secondary transition">
          Proces
        </SmoothLink>
      </nav>

      {/* Logowanie - Desktop */}
      <div className="hidden md:flex gap-4 items-center">
        <SignedOut>
          <SignInBtn />
          <SignUpBtn />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Hamburger - Mobile */}
      <button
        className="md:hidden text-gray-700 hover:text-secondary transition"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden animate-slideDown">
          <nav className="flex flex-col">
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer text-center"
            >
              O nas
            </a>
            <a 
              href="#proccess" 
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                document.querySelector('#proccess')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer text-center"
            >
              Proces
            </a>

            {/* Auth buttons w mobile menu */}
            <div className="flex flex-col gap-3 px-6 py-4 border-t border-gray-200">
              <SignedOut>
                <div className="flex flex-col gap-3" onClick={closeMenu}>
                  <SignInBtn />
                  <SignUpBtn />
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3 py-2">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}