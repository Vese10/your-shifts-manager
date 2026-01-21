import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="text-4xl font-bold">Your Shifts Manager</h1>

        <SignedIn>
          <div className="flex items-center gap-4">
            <p>Welcome back!</p>
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <SignInButton>
              <button className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}
