
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // Clear all roles on visiting the login page
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('isDoctorLoggedIn');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().startsWith('admin')) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        router.push('/admin/dashboard');
    } else if (email.toLowerCase().startsWith('doctor')) {
        localStorage.setItem('isDoctorLoggedIn', 'true');
        router.push('/doctor/dashboard');
    } else {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email to login. <br />
              <span className="text-xs">
                (Use <b>admin@shecare.com</b> for admin, <b>doctor@shecare.com</b> for doctor)
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardContent>
          <CardFooter className="text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" asChild><Link href="/auth/register">Register</Link></Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
