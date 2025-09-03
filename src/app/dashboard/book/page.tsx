
"use client"

import * as React from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Stethoscope } from "lucide-react"
import { Input } from "@/components/ui/input"

const specialties = ["Gynecology", "Mental Health", "Nutrition", "Dermatology", "Endocrinologist", "General Physician"];
const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function BookConsultationPage() {
  const searchParams = useSearchParams()
  const initialSpecialty = searchParams.get('specialty') || "";
  const initialDoctor = searchParams.get('doctor') || "";

  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [specialty, setSpecialty] = React.useState<string>(initialSpecialty)
  const [doctor, setDoctor] = React.useState<string>(initialDoctor);
  const [time, setTime] = React.useState<string>("")
  const [isClient, setIsClient] = React.useState(false)
  const { toast } = useToast()
  
  React.useEffect(() => {
    setIsClient(true)
    const specialtyFromQuery = searchParams.get('specialty');
    const doctorFromQuery = searchParams.get('doctor');
    if (specialtyFromQuery && specialties.includes(specialtyFromQuery)) {
      setSpecialty(specialtyFromQuery);
    }
    if(doctorFromQuery) {
        setDoctor(doctorFromQuery);
    }
  }, [searchParams]);

  const handleConfirm = () => {
    if (!specialty || !date || !time) {
       toast({
        title: "Incomplete Information",
        description: "Please select a specialty, date, and time.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Appointment Confirmed!",
      description: `Your ${specialty} consultation is booked for ${date.toLocaleDateString()} at ${time}.`,
    })
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Book a Consultation</CardTitle>
          <CardDescription>Select a specialty and a time that works for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">1. Select Specialty</Label>
              <Select onValueChange={setSpecialty} value={specialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a medical specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
                <Label className="text-lg font-semibold">Doctor</Label>
                <Input value={doctor} readOnly placeholder="Doctor will be assigned" />
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">2. Select Date</Label>
              <div className="flex justify-center">
                 <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(currentDate) => isClient && currentDate < yesterday}
                  />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold">3. Select Time</Label>
              <RadioGroup value={time} onValueChange={setTime} className="grid grid-cols-2 gap-4 pt-2">
                {timeSlots.map(slot => (
                  <div key={slot} className="relative">
                    <RadioGroupItem value={slot} id={slot} className="peer sr-only" />
                    <Label
                      htmlFor={slot}
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {slot}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <Button onClick={handleConfirm} size="lg" className="w-full">Confirm Appointment</Button>
        </CardContent>
      </Card>
    </div>
  )
}
