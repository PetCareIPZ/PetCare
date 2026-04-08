'use server';

// import { useEffect} from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@clerk/nextjs';
import Hero from '~/components/public/sections/Hero';
import About from '~/components/public/sections/About';
import Proccess from '~/components/public/sections/Proccess';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
  
export default async function HomePage() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated){
    redirect("/dashboard")
  }
  return (
    <main className="pt-16">
      <Hero />
      <About />
      <Proccess />
    </main>
  );
}
