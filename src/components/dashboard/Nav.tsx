'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SignInBtn, SignUpBtn } from '../../../(public)/components/ui/AuthButtons';
import { usePathname } from 'next/navigation';



export default function Nav() {
  const pathname = usePathname();
  
  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <header
      className="fixed top-0 left-0 w-full h-16 bg-white z-50 flex justify-between items-center px-6"
      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
      >
      <div className="flex flex-wrap gap-2 ">
      <Link href="/dashboard">
        <h1 className="text-2xl cursor-pointer">PetCare</h1>
      </Link>

        {segments.map((segment, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="text-gray-400">/</span>
            <h1 className="text-2xl cursor-pointer">
              {segment.replace(/-/g, " ")}
            </h1>
          </span>
        ))}

      </div>
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