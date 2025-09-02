
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AiRecommendationForm } from "@/components/ai-recommendation-form"
import Link from "next/link"

export default function ChatPage() {
  const upcomingAppointments = [
    { doctor: "Dr. Evelyn Reed", specialty: "Gynecology" },
    { doctor: "Dr. Sarah Chen", specialty: "Mental Health" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Anonymous Chat</h1>
      <Tabs defaultValue="ai-assistant">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="ai-assistant">AI Health Assistant</TabsTrigger>
          <TabsTrigger value="doctor-chat">Doctor Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="ai-assistant" className="mt-6">
          <AiRecommendationForm />
        </TabsContent>
        <TabsContent value="doctor-chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Chats</CardTitle>
              <CardDescription>Select a consultation to start a conversation.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {upcomingAppointments.map((appt, index) => (
                    <Card key={index}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <h3 className="font-semibold">{appt.doctor}</h3>
                                <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                            </div>
                             <Button asChild>
                                <Link href={`/dashboard/chat/${index}`}>
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Open Chat
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                 {upcomingAppointments.length === 0 && (
                     <div className="text-center text-muted-foreground py-12">
                        <MessageCircle className="mx-auto h-12 w-12" />
                        <p className="mt-4">You have no upcoming consultations to chat about.</p>
                        <Button asChild variant="link">
                            <Link href="/dashboard/book">Book a Consultation</Link>
                        </Button>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
