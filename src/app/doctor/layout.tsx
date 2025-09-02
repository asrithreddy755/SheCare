
"use client";

import { useDoctorAuth } from '@/hooks/use-doctor-auth';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useDoctorAuth();
  return <div className="container py-8 md:py-12">{children}</div>;
}
