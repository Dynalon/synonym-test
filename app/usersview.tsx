"use client"

import { useEffect } from "react"
import { useUserStore } from "./store"
import { User, UserResponse } from "./types"

async function fetchUsers(page: number, results: number) {
  const url = new URL("https://randomuser.me/api/")
  url.searchParams.set("page", page.toString())
  url.searchParams.set("results", results.toString())

  const response = await fetch(url.toString())

  // to detect offlinenes
  if (!response.ok) {
    throw new Error("failure to receive users")
  }

  const body = (await response.json()) as UserResponse
  return body
}

export function UserCard({ user }: { user: User }) {
  return <div>{JSON.stringify(user.email)}</div>
}

export function UsersView() {
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
    <div className="w-full">
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
    </div>
  )
}
