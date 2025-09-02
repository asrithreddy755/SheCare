import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-20 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tighter text-center font-headline">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By creating an account and using SheCare ("Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the Service.
              </p>

              <h2 className="text-xl font-semibold text-foreground">2. Anonymity and Privacy</h2>
              <p>
                Our Service is designed to protect your privacy. You will create an anonymous profile using an alias. We are committed to not sharing your identifiable information. All communications, including video calls and chats, are end-to-end encrypted. Please review our <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link> for more details.
              </p>

              <h2 className="text-xl font-semibold text-foreground">3. Medical Disclaimer</h2>
              <p>
                SheCare is a platform that connects you with certified medical professionals. The advice provided by doctors on this platform is based on the information you provide. It is not a substitute for a comprehensive in-person medical evaluation. This service is not for medical emergencies.
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">4. User Conduct</h2>
               <p>
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide any false or misleading information.</li>
                <li>Harass, abuse, or harm another person.</li>
                <li>Violate any applicable laws or regulations.</li>
              </ul>
              

              <h2 className="text-xl font-semibold text-foreground">5. Accounts</h2>
              <p>
                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
              </p>

              <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please <Link href="/about#contact" className="underline hover:text-primary">contact us</Link>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
