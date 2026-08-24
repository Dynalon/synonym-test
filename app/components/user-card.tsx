"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarFallback } from "radix-ui/avatar"
import { User } from "../types"

export function UserCard({ user }: { user: User }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`
  const initials = `${user.name.first[0]}${user.name.last[0]}`.toUpperCase()

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <Avatar>
          <AvatarImage src={user.picture.thumbnail} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium">{fullName}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
          <span className="text-xs text-muted-foreground">
            {user.location.city}, {user.location.state}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
