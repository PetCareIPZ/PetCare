import "~/styles/globals.css";
import { type Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';

import Header from './components/Header';
import SplitLogin from "./components/SplitLogin";

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
      <html lang="pl">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <SplitLogin />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
