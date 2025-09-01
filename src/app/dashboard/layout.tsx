
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth();
  return <div className="container py-8 md:py-12">{children}</div>;
}
