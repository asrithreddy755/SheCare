import { cn } from "@/lib/utils"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold text-primary", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
      >
        <path
          fillRule="evenodd"
          d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A.75.75 0 017.05 14.5h9.9a.75.75 0 01.74.617l.434 2.598A.75.75 0 0117.41 19.5H6.59a.75.75 0 01-.712-1.285l.434-2.598z"
          clipRule="evenodd"
        />
      </svg>
      SheCare
    </Link>
  )
}
