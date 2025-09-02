
"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lock, MessageCircle, Star, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import * as React from 'react'

const features = [
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: 'Anonymous Profile',
    description: 'Create a profile using an alias. Your privacy is our top priority. No real names required.',
  },
  {
    icon: <Video className="w-8 h-8 text-primary" />,
    title: 'Secure Video Calls',
    description: 'End-to-end encrypted video consultations with certified medical professionals.',
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: 'Encrypted Chat',
    description: 'Chat with your doctor privately before and after your consultation through a secure channel.',
  },
];

const testimonials = [
    {
        quote: "SheCare has been a game-changer for me. I was able to discuss a sensitive health issue without any fear of being judged. Truly grateful for this platform.",
        author: "Anonymous",
    },
    {
        quote: "The anonymity gave me the confidence to finally seek help. The doctor was professional, and the video call was seamless. Highly recommended!",
        author: "Anonymous",
    },
    {
        quote: "I love how easy it is to book an appointment. The whole process is designed with user privacy in mind. It's a service I can trust.",
        author: "Anonymous",
    },
    {
        quote: "Finally, a healthcare platform that understands the need for privacy. The encrypted chat is a great feature for follow-up questions.",
        author: "Anonymous",
    },
     {
        quote: "As someone with a busy schedule, being able to connect with a doctor from home is amazing. The platform is secure and very user-friendly.",
        author: "Anonymous",
    },
];

export default function Home() {

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary/20 dark:bg-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex flex-col justify-center space-y-4 animate-fade-in-up">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                    Your Health, Your Privacy
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                    SheCare provides a safe and anonymous space for women to connect with doctors for video consultations. Your well-being matters, and so does your privacy.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                    <Button asChild size="lg">
                        <Link href="/dashboard/book">Book a Consultation</Link>
                    </Button>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How SheCare Protects You</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We've built our platform from the ground up with your security and anonymity in mind.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="hover:bg-primary/10 transition-colors duration-300 animate-pop-in" style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Getting Started is Easy</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Just 3 simple steps to get the care you need, when you need it.
              </p>
            </div>
            <div className="mx-auto w-full max-w-5xl mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center space-y-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">1</div>
                      <h3 className="text-lg font-bold">Create Account</h3>
                      <p className="text-sm text-muted-foreground">Sign up with an alias. It's fast, free, and secure.</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">2</div>
                      <h3 className="text-lg font-bold">Book a Slot</h3>
                      <p className="text-sm text-muted-foreground">Choose a specialty, doctor, and a time that works for you.</p>
                  </div>
                   <div className="flex flex-col items-center space-y-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">3</div>
                      <h3 className="text-lg font-bold">Start Consultation</h3>
                      <p className="text-sm text-muted-foreground">Join the secure video call from your dashboard at the scheduled time.</p>
                  </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What Our Users Say</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Read how SheCare has made a difference in their lives.
                        </p>
                    </div>
                </div>
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full max-w-4xl mx-auto mt-12"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="h-full">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                       <div className="flex mb-2">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                                        </div>
                                        <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                                        <p className="font-semibold mt-4">- {testimonial.author}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
      </main>
    </div>
  );
}

    