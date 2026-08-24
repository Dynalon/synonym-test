"use client"

import { RESULTS_PER_PAGE } from "@/constants"
import { useEffect } from "react"
import { fetchUsers } from "../restApi"
import { useUserStore } from "../store"
import { InfinitePagination, usePaginationStore } from "./pagination"
import { UserCard } from "./user-card"
import { db } from "../cache"

export function UserList() {
  const { users, setUsers, setLoading, setError } = useUserStore()
  const { page } = usePaginationStore()

  useEffect(() => {
    let cancelled = false

    async function loadUsers() {
      setError(false)
      setLoading(true)

      try {
        const response = await fetchUsers(page, RESULTS_PER_PAGE)
        await db.responses.put({ ...response, page: response.info.page })

        if (cancelled) return
        setUsers(response.results)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadUsers()

    return () => {
      cancelled = true
    }
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
