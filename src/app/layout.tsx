import "~/styles/globals.css";

import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'

// returns <svg> spacer in header element
// color:string takes --color variable as an argument
export function svgSpacer(color:string){
  return `<svg height="32" viewBox="0 0 32 32" width="32"><path d="M22 5L9 28" stroke="var(${color})" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
} 

export const metadata: Metadata = {
  title: "Petcare",
  description: "Projekt na Inżynierski projekt zespołowy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="pl">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            {/* odpowiada za linki i za path do aktualnego page-a */}
            <div className="">

            </div>
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
