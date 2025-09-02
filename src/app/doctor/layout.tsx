
"use client";

import { useDoctorAuth } from '@/hooks/use-doctor-auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useDoctorAuth();
  const pathname = usePathname();
  const showBackButton = pathname.includes('/doctor/chat/');

  return (
    <div className="container py-8 md:py-12">
      {showBackButton && (
        <Button variant="outline" size="sm" className="mb-4" asChild>
          <Link href="/doctor/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      )}
      {children}
    </div>
  );
}
