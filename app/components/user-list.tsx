"use client"

import { RESULTS_PER_PAGE } from "@/constants"
import { useEffect } from "react"
import { fetchUsers } from "../restApi"
import { useUserStore } from "../store"
import { InfinitePagination, usePaginationStore } from "./pagination"
import { UserCard } from "./user-card"

export function UserList() {
  const { users, setUsers, setLoading, setError } = useUserStore()
  const { page } = usePaginationStore()

  useEffect(() => {
    setLoading(true)
    fetchUsers(page, RESULTS_PER_PAGE)
      .then((result) => result.results)
      .then(setUsers)
      .then(() => setLoading(false))
      .catch(() => setError(true))
  }, [page])

  return (
    <>
      <div className="flex w-full justify-center">
        <InfinitePagination />
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        {users.map((user) => (
          <UserCard key={user.login.uuid} user={user} />
        ))}
      </div>
    </>
  )
}
