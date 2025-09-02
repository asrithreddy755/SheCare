
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const { toast } = useToast()

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!review.trim() || rating === 0) {
      toast({
        title: "Incomplete Review",
        description: "Please provide a rating and a message.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you'd send this to your backend
    console.log({ rating, review })

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    })
    setReview("")
    setRating(0)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Leave a Review</CardTitle>
          <CardDescription>
            Your feedback helps us improve SheCare for everyone. All reviews are anonymous.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-semibold">Your Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="review-text" className="text-lg font-semibold">Your Review</label>
              <Textarea
                id="review-text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience..."
                className="min-h-[150px]"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
