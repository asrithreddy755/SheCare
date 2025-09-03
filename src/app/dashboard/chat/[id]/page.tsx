
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DoctorChatPage({ params }: { params: { id: string } }) {
    const doctorName = "Dr. Evelyn Reed"; // This would be fetched based on the appointment/chat ID
  
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Chat with {doctorName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 h-[400px] overflow-y-auto p-4 border rounded-md flex flex-col">
                    {/* Chat messages */}
                    <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/100/100?q=1" data-ai-hint="doctor woman" />
                        <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-muted p-3 max-w-[70%]">
                        <p className="text-sm">Hello! How can I help you today? Please describe your concerns.</p>
                        </div>
                    </div>
                    <div className="flex items-end gap-2 justify-end">
                        <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[70%]">
                        <p className="text-sm">Hi Dr. Reed. I've been experiencing some issues and wanted to discuss them before our video call.</p>
                        </div>
                        <Avatar className="h-8 w-8">
                        <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/100/100?q=1" data-ai-hint="doctor woman" />
                        <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-muted p-3 max-w-[70%]">
                        <p className="text-sm">Of course, feel free to share. I'm here to listen.</p>
                        </div>
                    </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                    <Input placeholder="Type your message..." />
                    <Button><Send className="h-4 w-4" /></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
