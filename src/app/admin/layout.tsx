
"use client";

import { useAdminAuth } from '@/hooks/use-admin-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAdminAuth();
  return <div className="container py-8 md:py-12">{children}</div>;
}
