'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard page
    router.push('/user/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce">
          <Image
            src="/icons/logo.svg"
            alt="EarnVerse Logo"
            width={80}
            height={80}
          />
        </div>
        <h1 className="text-3xl font-bold">EarnVerse</h1>
        <p className="text-lg">Redirecting to dashboard...</p>
        <div className="mt-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    </div>
  );
}
