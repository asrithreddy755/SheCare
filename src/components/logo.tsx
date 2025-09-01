import { cn } from "@/lib/utils"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-2xl font-bold text-primary", className)}>
      SheCare
    </Link>
  )
}
