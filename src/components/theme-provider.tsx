"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = () => {
    const context = React.useContext(NextThemesProvider as any)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    // next-themes useTheme returns an object with a `theme` and `setTheme` property
    return context;
}
