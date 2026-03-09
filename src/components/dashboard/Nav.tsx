'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { usePathname, useParams} from 'next/navigation';
import { SignInBtn, SignUpBtn } from '../public/ui/AuthButtons';

const pathTranslations = {
  "dashboard"         : "Podsumowanie",
  add                 : "dodaj",
  animals             : "zwierzęta",
  drugs               : "leki",
  facilities          : "placówki blisko ciebie",
  "konwledge-base"      : "baza wiedzy",
  reminders           : "przypomnienia",
  settings            : "ustawienia",
  visits              : "wizyty",
  edit                : "edytuj",
  "health-card"       : "karta zdrowia",
  "add-drug"          : "dodaj lek",
  "add-vacc"          : "dodaj szczepionke",
  "add-visit"         : "dodaj wizytę",
  "visit-registration": "rejestracja wizyty"
};


export default function Nav() {
  const pathname = usePathname();
  const { petId } = useParams()
  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <header
      className="fixed top-0 left-0 w-full h-16 bg-white z-50 flex justify-between items-center px-6 z-[1002]"
      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
      >
      <div className="flex flex-wrap gap-2 ">
      <Link href="/dashboard">
        <h1 className="text-2xl cursor-pointer">PetCare</h1>
      </Link>

        {segments.map((segment : string, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          return (
            <Link key={href} href={href} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              <h1 className="text-2xl cursor-pointer">
                {
                  petId == segment ? "zwierzak" : pathTranslations[segment as keyof typeof pathTranslations] ?? segment.replace(/-/g, " ")
                }
              </h1>
            </Link>
          );
        })}

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