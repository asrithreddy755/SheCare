
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useDoctorAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isDoctorLoggedIn = localStorage.getItem('isDoctorLoggedIn');
    if (!isDoctorLoggedIn) {
      router.replace('/auth/login');
    }
  }, [router]);
};
