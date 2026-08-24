"use client"
import { Button } from "@/components/ui/button"
import { Unplug, Plug } from "lucide-react"
import { useUserStore } from "../store"

export function OfflineToggleButton() {
  const { offline, toggleManualOffline } = useUserStore()
  const iconClass = "h-5 w-5"

  return (
    <Button
      variant={offline ? "destructive" : "outline"}
      onClick={toggleManualOffline}
      aria-label={offline ? "Go back online" : "Go offline"}
      className="gap-2"
    >
      {offline ? (
        <Plug className={iconClass} />
      ) : (
        <Unplug className={iconClass} />
      )}
      <span>{offline ? "Go back online" : "Go offline"}</span>
    </Button>
  )
}
