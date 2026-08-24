import { UserResponse } from "./types"

export async function fetchUsers(page: number, results: number) {
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
