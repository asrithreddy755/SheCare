
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create your anonymous account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="alias-name">Alias Name</Label>
            <Input id="alias-name" placeholder="e.g., JaneDoe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="25" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" type="text" value="Female" readOnly disabled />
            </div>
          </div>
          <div className="flex items-start space-x-2 mt-2">
            <Checkbox id="hide-name" defaultChecked />
            <Label htmlFor="hide-name" className="text-sm font-normal text-muted-foreground leading-none">
                Hide my real name from doctors (recommended for privacy)
            </Label>
          </div>
           <div className="flex items-start space-x-2 mt-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal leading-none">
              I accept the <Link href="#" className="underline hover:text-primary">terms and conditions</Link>.
            </Label>
          </div>
          <Button type="submit" className="w-full mt-2">
            Create an account
          </Button>
        </CardContent>
        <CardFooter className="text-sm">
          Already have an account?{" "}
          <Button variant="link" asChild><Link href="/auth/login">Login</Link></Button>
        </CardFooter>
      </Card>
    </div>
  )
}
