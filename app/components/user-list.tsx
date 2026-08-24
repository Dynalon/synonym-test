"use client"

import { useEffect } from "react"
import { fetchUsers } from "../restApi"
import { useUserStore } from "../store"
import { UserCard } from "./user-card"

export function UserList() {
  const { users, setUsers, setLoading, setError } = useUserStore()

  useEffect(() => {
    setLoading(true)
    fetchUsers(1, 10)
      .then((result) => result.results)
      .then(setUsers)
      .then(() => setLoading(false))
      .catch(() => setError(true))
  }, [])

  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
    </div>
  )
}
