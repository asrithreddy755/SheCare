
"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Video, MessageCircle } from "lucide-react"
import Link from "next/link"
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

type Appointment = {
  patientAlias: string
  date: string
  time: string
  status: "Confirmed" | "Completed" | "Cancelled"
}

const upcomingAppointments: Appointment[] = [
  { patientAlias: "Sunny", date: "2024-08-15", time: "10:30 AM", status: "Confirmed" },
  { patientAlias: "Aqua", date: "2024-08-15", time: "11:30 AM", status: "Confirmed" },
  { patientAlias: "Starlight", date: "2024-08-16", time: "02:00 PM", status: "Confirmed" },
];

const pastAppointments: Appointment[] = [
    { patientAlias: "Fern", date: "2024-08-12", time: "09:00 AM", status: "Completed" },
    { patientAlias: "River", date: "2024-08-11", time: "03:00 PM", status: "Completed" },
]

export default function DoctorDashboardPage() {
  const router = useRouter()
  const doctorName = "Dr. Chen" // Mock doctor name

  const handleLogout = () => {
    localStorage.removeItem('isDoctorLoggedIn')
    router.push('/auth/login')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, {doctorName}</h1>
          <p className="text-muted-foreground">Here are your appointments for today and the upcoming week.</p>
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

      <div className="grid md:grid-cols-2 gap-8">
         <Card>
            <CardHeader>
              <CardTitle>Upcoming Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appt, index) => (
                    <TableRow key={appt.patientAlias}>
                      <TableCell className="font-medium">{appt.patientAlias}</TableCell>
                      <TableCell>{appt.date} at {appt.time}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                           <Link href={`/doctor/chat/${index}`}>
                            <MessageCircle className="h-4 w-4" />
                           </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
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
              <CardTitle>Past Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                 <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastAppointments.map((appt, index) => (
                    <TableRow key={appt.patientAlias}>
                      <TableCell className="font-medium">{appt.patientAlias}</TableCell>
                      <TableCell>{appt.date}</TableCell>
                      <TableCell>
                         <Badge variant={appt.status === "Completed" ? "default" : "secondary"}>
                          {appt.status}
                        </Badge>
                      </TableCell>
                       <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" asChild>
                           <Link href={`/doctor/chat/${index + upcomingAppointments.length}`}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat
                           </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}

    