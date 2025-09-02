
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/about#contact', label: 'Contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState('/auth/login');

  useEffect(() => {
    const user = localStorage.getItem('isLoggedIn');
    const admin = localStorage.getItem('isAdminLoggedIn');
    const doctor = localStorage.getItem('isDoctorLoggedIn');
    
    if (user) {
        setIsLoggedIn(true);
        setDashboardUrl('/dashboard');
    } else if (admin) {
        setIsLoggedIn(true);
        setDashboardUrl('/admin/dashboard');
    } else if (doctor) {
        setIsLoggedIn(true);
        setDashboardUrl('/doctor/dashboard');
    } else {
        setIsLoggedIn(false);
    }
  }, [usePathname()]); // Re-check on route change

  const authLinks = isLoggedIn
    ? []
    : [
        { href: '/auth/login', label: 'Login' },
        { href: '/auth/register', label: 'Register' },
      ];

  const mobileNavLinks = isLoggedIn
    ? [...navLinks, { href: dashboardUrl, label: 'Dashboard' }]
    : [...navLinks, ...authLinks];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-6 md:ml-10 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link key={label} href={href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
            <nav className="hidden md:flex items-center gap-2">
                {isLoggedIn ? (
                    <Button asChild>
                        <Link href={dashboardUrl}><LayoutDashboard className="mr-2" />Dashboard</Link>
                    </Button>
                ) : (
                   <>
                    {authLinks.map(({href, label}) => (
                        <Button key={label} variant={href === '/auth/register' ? 'default' : 'ghost'} asChild>
                            <Link href={href}>{label}</Link>
                        </Button>
                    ))}
                   </>
                )}
            </nav>
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <Logo />
                </div>
                <nav className="flex flex-col gap-4 text-sm font-medium">
                  {mobileNavLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="transition-colors hover:text-primary text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
