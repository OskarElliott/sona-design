'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Class-based theming (brief §3.3): light is the explicit default first
// paint — NOT the system preference (approachable for a nervous buyer).
// Dark is a deliberate toggle, persisted by next-themes in localStorage.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
