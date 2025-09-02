
"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


type Doctor = {
  name: string
  specialty: string
  status: "Active" | "Inactive"
}

const initialDoctors: Doctor[] = [
  { name: "Dr. Evelyn Reed", specialty: "Gynecology", status: "Active" },
  { name: "Dr. Sarah Chen", specialty: "Mental Health", status: "Active" },
  { name: "Dr. Ben Carter", specialty: "Nutrition", status: "Inactive" },
  { name: "Dr. Maria Garcia", specialty: "Dermatology", status: "Active" },
]

export default function AdminDashboardPage() {
  const [doctors, setDoctors] = React.useState<Doctor[]>(initialDoctors)
  const [newDoctor, setNewDoctor] = React.useState({ name: "", specialty: "" })
  const { toast } = useToast()
  const router = useRouter();


  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDoctor.name && newDoctor.specialty) {
      setDoctors([...doctors, { ...newDoctor, status: "Active" }])
      setNewDoctor({ name: "", specialty: "" })
      toast({
        title: "Doctor Added",
        description: `${newDoctor.name} has been added to the list.`,
      })
    }
  }

  const handleRemoveDoctor = (doctorName: string) => {
    setDoctors(doctors.filter((doc) => doc.name !== doctorName))
    toast({
      title: "Doctor Removed",
      description: `${doctorName} has been removed.`,
      variant: "destructive"
    })
  }
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/auth/login');
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage doctors and platform settings.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be returned to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Management</CardTitle>
              <CardDescription>View and remove doctors from the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.name}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>
                        <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>
                          {doctor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveDoctor(doctor.name)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Doctor</CardTitle>
              <CardDescription>Add a new medical professional to SheCare.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAddDoctor}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-name">Full Name</Label>
                  <Input
                    id="doctor-name"
                    placeholder="e.g., Dr. John Doe"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    placeholder="e.g., General Practice"
                    value={newDoctor.specialty}
                    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Doctor
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
