import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SignInBtn, SignUpBtn } from './AuthButtons';

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full h-16 bg-white z-50 flex justify-center items-center p-4 gap-4"
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <h1 className="text-xl font-bold">PetCare</h1>

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
