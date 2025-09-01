import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export default function VideoConsultationPage({ params }: { params: { id: string } }) {
  const userAlias = "Sunny";
  const doctorName = "Dr. Evelyn Reed";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Video Consultation with {doctorName}</CardTitle>
            </CardHeader>
            <CardContent className="relative aspect-video bg-muted rounded-md flex items-center justify-center">
              <div className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-md text-sm">{doctorName}</div>
              <Video className="w-16 h-16 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <div className="relative aspect-video bg-muted rounded-md flex items-center justify-center">
             <div className="absolute top-2 left-2 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs">{userAlias} (You)</div>
             <VideoOff className="w-10 h-10 text-muted-foreground" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Controls</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center gap-2">
              <Button variant="outline" size="icon">
                <Mic className="h-5 w-5" />
              </Button>
               <Button variant="outline" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="destructive" size="icon">
                <PhoneOff className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
