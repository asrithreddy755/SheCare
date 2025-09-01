
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a mock authentication hook.
// In a real application, you would check for a valid session with your auth provider.
export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // This is a simplified check. A real app would have a more robust session check.
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.replace('/auth/login');
    }
  }, [router]);
};
