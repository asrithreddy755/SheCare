"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/dashboard', label: 'Dashboard' }
];

const authLinks = [
    { href: '/auth/login', label: 'Login' },
    { href: '/auth/register', label: 'Register' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                {authLinks.map(({href, label}) => (
                    <Button key={label} variant={href === '/auth/register' ? 'default' : 'ghost'} asChild>
                        <Link href={href}>{label}</Link>
                    </Button>
                ))}
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
                    <SheetTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close menu</span>
                         </Button>
                    </SheetTrigger>
                </div>
                <nav className="flex flex-col gap-4 text-sm font-medium">
                  {[...navLinks, ...authLinks].map(({ href, label }) => (
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
