
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a mock authentication hook for admin users.
export const useAdminAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      router.replace('/auth/login');
    }
  }, [router]);
};
