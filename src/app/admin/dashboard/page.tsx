
"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, Inbox, UserPlus } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


type Doctor = {
  name: string
  specialty: string
  email: string
  status: "Active" | "Inactive"
}

type Admin = {
    name: string;
    email: string;
}

type Message = {
  name: string;
  email: string;
  message: string;
  date: string;
}

const initialDoctors: Doctor[] = [
  { name: "Dr. Evelyn Reed", specialty: "Gynecology", email: "doctor.reed@shecare.com", status: "Active" },
  { name: "Dr. Sarah Chen", specialty: "Mental Health", email: "doctor.chen@shecare.com", status: "Active" },
  { name: "Dr. Ben Carter", specialty: "Nutrition", email: "doctor.carter@shecare.com", status: "Inactive" },
  { name: "Dr. Maria Garcia", specialty: "Dermatology", email: "doctor.garcia@shecare.com", status: "Active" },
]

const initialAdmins: Admin[] = [
    { name: "Super Admin", email: "admin@shecare.com" },
]

const specialties = ["Gynecology", "Mental Health", "Nutrition", "Dermatology", "Endocrinologist", "General Physician"];

export default function AdminDashboardPage() {
  const [doctors, setDoctors] = React.useState<Doctor[]>(initialDoctors)
  const [admins, setAdmins] = React.useState<Admin[]>(initialAdmins);
  const [messages, setMessages] = React.useState<Message[]>([])
  const [newDoctor, setNewDoctor] = React.useState({ name: "", specialty: "", email: "", password: "" })
  const [newAdmin, setNewAdmin] = React.useState({ name: "", email: "" });
  const { toast } = useToast()
  const router = useRouter();

  React.useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
    setMessages(storedMessages.sort((a: Message, b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [])

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDoctor.name && newDoctor.specialty && newDoctor.email && newDoctor.password) {
      setDoctors([...doctors, { name: newDoctor.name, specialty: newDoctor.specialty, email: newDoctor.email, status: "Active" }])
      setNewDoctor({ name: "", specialty: "", email: "", password: "" })
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

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdmin.name && newAdmin.email) {
      setAdmins([...admins, newAdmin]);
      setNewAdmin({ name: "", email: "" });
      toast({
        title: "Admin Added",
        description: `${newAdmin.name} has been added as an admin.`,
      });
    }
  };

  const handleRemoveAdmin = (adminEmail: string) => {
    // Prevent the last admin from being removed
    if (admins.length <= 1) {
        toast({
            title: "Cannot Remove Admin",
            description: "At least one administrator must remain.",
            variant: "destructive",
        });
        return;
    }
    setAdmins(admins.filter((admin) => admin.email !== adminEmail));
    toast({
      title: "Admin Removed",
      description: `The admin has been removed.`,
      variant: "destructive",
    });
  };

  const handleRemoveMessage = (messageDate: string) => {
    const updatedMessages = messages.filter(msg => msg.date !== messageDate)
    setMessages(updatedMessages)
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages))
    toast({
        title: "Message Removed",
        description: "The message has been deleted.",
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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
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
                    <TableHead>Email</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.name}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
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
           <Card>
            <CardHeader>
              <CardTitle>Administrator Management</CardTitle>
              <CardDescription>Add or remove administrators.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.email}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveAdmin(admin.email)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove Admin</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox /> Inbox
                </CardTitle>
                <CardDescription>Messages from the contact form.</CardDescription>
              </CardHeader>
              <CardContent>
                 <ScrollArea className="h-[300px] w-full">
                    {messages.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Message</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {messages.map((msg) => (
                                <TableRow key={msg.date}>
                                  <TableCell className="font-medium">{msg.name}</TableCell>
                                  <TableCell>{msg.email}</TableCell>
                                  <TableCell className="max-w-[200px] truncate">{msg.message}</TableCell>
                                  <TableCell className="text-right">
                                      <Button variant="ghost" size="icon" onClick={() => handleRemoveMessage(msg.date)}>
                                          <Trash2 className="h-4 w-4" />
                                          <span className="sr-only">Delete message</span>
                                      </Button>
                                  </TableCell>
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <Inbox className="mx-auto h-12 w-12" />
                            <p>No messages yet.</p>
                        </div>
                    )}
                </ScrollArea>
              </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
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
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="e.g., doctor@shecare.com"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                    required
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    placeholder="Enter a strong password"
                    value={newDoctor.password}
                    onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                    <Select onValueChange={(value) => setNewDoctor({ ...newDoctor, specialty: value })} value={newDoctor.specialty} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose a specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            {specialties.map(spec => (
                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
          <Card>
            <CardHeader>
                <CardTitle>Add New Admin</CardTitle>
                <CardDescription>Add a new administrator to SheCare.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAddAdmin}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="admin-name">Full Name</Label>
                    <Input
                    id="admin-name"
                    placeholder="e.g., Admin User"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                    id="admin-email"
                    type="email"
                    placeholder="e.g., admin2@shecare.com"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                    />
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Admin
                </Button>
                </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

    

    
