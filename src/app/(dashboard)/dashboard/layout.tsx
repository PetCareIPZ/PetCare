import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';

import DashboardNav from '~/components/dashboard/Nav';
import Sidebar from '~/components/dashboard/Sidebar';
import MobileSidebar from '~/components/dashboard/MobileSidebar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DashboardNav />
        <MobileSidebar />
        <main className="min-h-screen pt-16">
          <div className="flex gap-6 max-w-7xl mx-auto px-4 sm:px-6 py-10 overflow-x-hidden">
            <Sidebar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
}
