"use client"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DarkModeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const iconClass = "h-5 w-5"

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"
  const label = isDark ? "Light mode" : "Dark mode"

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${label.toLowerCase()}`}
      className="gap-2"
    >
      {isDark ? <Sun className={iconClass} /> : <Moon className={iconClass} />}
      <span>{label}</span>
    </Button>
  )
}
