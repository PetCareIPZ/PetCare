'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import Hero from '~/components/public/sections/Hero';
import About from '~/components/public/sections/About';
import Proccess from '~/components/public/sections/Proccess';

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
