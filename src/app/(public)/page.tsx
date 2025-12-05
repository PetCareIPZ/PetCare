'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Proccess from './components/sections/Proccess';

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  if (isSignedIn) return null;

  return (
    <main className="pt-16">
      <Hero />
      <About />
      <Proccess />
    </main>
  );
}
