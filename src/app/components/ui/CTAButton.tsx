'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';

interface CTABtnProps {
  action: 'sign-in' | 'sign-up';
  label: string;
}

export function CTABtn({ action, label }: CTABtnProps) {
  
  const buttonClasses =
    action === 'sign-in'
      ? 'cursor-pointer hover:text-[#5930d1] font-medium text-sm sm:text-base'
      : 'bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5930d1] transition-colors';

  const ButtonContent = (
    <button className={buttonClasses}>
      {label}
    </button>
  );

  if (action === 'sign-in') {
    return <SignInButton mode='modal'>{ButtonContent}</SignInButton>;
  } else {
    return <SignUpButton mode='modal'>{ButtonContent}</SignUpButton>;
  }
}
