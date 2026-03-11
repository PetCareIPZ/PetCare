import "~/styles/globals.css";
import { type Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';

import Nav from '~/components/public/sections/Nav';
import ScrollToTop from '~/components/public/ui/ScrollToTop';
import Footer from '~/components/public/sections/Footer';

export const metadata: Metadata = {
  title: "Petcare",
  description: "Projekt na Inżynierski projekt zespołowy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Nav />
          {children}
          <Footer />
          <ScrollToTop />
        </div>
    </ClerkProvider>
  );
}
