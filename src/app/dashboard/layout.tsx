import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';

import DashboardNav from './components/Nav';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DashboardNav />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
}
