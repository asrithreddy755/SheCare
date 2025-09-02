
"use client";

import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth();
  const pathname = usePathname();
  const showBackButton = pathname.includes('/dashboard/chat/') || pathname.includes('/dashboard/consultation/');

  return (
    <div className="container py-8 md:py-12">
       {showBackButton && (
        <Button variant="outline" size="sm" className="mb-4" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      )}
      {children}
    </div>
  );
}
