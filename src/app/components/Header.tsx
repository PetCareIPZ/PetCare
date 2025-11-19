import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SignInBtn, SignUpBtn } from './AuthButtons';

export default function Header() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 bg">
      <SignedOut>
        <SignInBtn />
        <SignUpBtn />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}