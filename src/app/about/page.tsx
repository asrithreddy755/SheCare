
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMessage = { 
      name, 
      email, 
      message, 
      date: new Date().toISOString() 
    };
    
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));
    
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  }


  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="max-w-4xl py-12 md:py-20 animate-fade-in-up">
            <div className="space-y-12">
                <div className="space-y-6 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Mission</h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                    Empowering women to take control of their health with confidence and privacy.
                </p>
                </div>

                <div className="space-y-6 text-lg text-center max-w-3xl mx-auto">
                    <p>
                    SheCare was founded on the principle that every woman deserves access to healthcare without compromising her privacy. We understand that some health concerns can be sensitive and difficult to discuss. Our platform provides a secure and anonymous bridge to certified medical professionals, ensuring that you can seek advice and care with peace of mind.
                    </p>
                    <p>
                    We are committed to creating a safe, respectful, and supportive environment. From anonymous profiles to end-to-end encrypted video calls, every feature is designed to protect you. Your health journey is personal, and at SheCare, we honor that.
                    </p>
                </div>

                <div id="contact" className="pt-12">
                <Card>
                    <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tighter text-center">Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <form className="space-y-4" onSubmit={handleSendMessage}>
                        <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    </div>
  )
}
