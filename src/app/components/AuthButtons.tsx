import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function SignInBtn() {
  return (
    <SignInButton>
      <button className="cursor-pointer hover:text-[#5930d1]">
        Sign In
      </button>
    </SignInButton>
  );
}

export function SignUpBtn() {
  return (
    <SignUpButton>
      <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5930d1] transition-colors">
        Sign Up
      </button>
    </SignUpButton>
  );
}