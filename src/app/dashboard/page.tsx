
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Stethoscope, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
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

const upcomingAppointments = [
  {
    doctor: "Dr. Evelyn Reed",
    specialty: "Gynecology",
    date: "2024-08-15",
    time: "10:30 AM",
    avatar: "https://picsum.photos/100/100?q=1",
    dataAiHint: "doctor woman"
  },
  {
    doctor: "Dr. Sarah Chen",
    specialty: "Mental Health",
    date: "2024-08-22",
    time: "02:00 PM",
    avatar: "https://picsum.photos/100/100?q=2",
    dataAiHint: "therapist smiling"
  },
];

export default function DashboardPage() {
  const userAlias = "Sunny"; // Mock user alias
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/auth/login');
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, {userAlias}</h1>
          <p className="text-muted-foreground">Here's your health dashboard.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/book">
              <Stethoscope className="mr-2 h-4 w-4" /> Book Consultation
            </Link>
          </Button>
           <Button variant="outline" asChild>
            <Link href="/dashboard/chat">
              <MessageCircle className="mr-2 h-4 w-4" /> Anonymous Chat
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingAppointments.map((appt, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={appt.avatar} alt={appt.doctor} data-ai-hint={appt.dataAiHint} />
                    <AvatarFallback>{appt.doctor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{appt.doctor}</CardTitle>
                    <CardDescription>{appt.specialty}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{appt.time}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                     <Link href={`/dashboard/consultation/${index}`}>Join Call</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <CardHeader>
              <CardTitle>No Upcoming Appointments</CardTitle>
              <CardDescription>You can book a new consultation anytime.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard/book">Book a Consultation</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
       <div className="text-right">
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
    </div>
  );
}
