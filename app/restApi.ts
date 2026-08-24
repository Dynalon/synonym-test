import { UserResponse } from "./types"

export async function fetchUsers(page: number, results: number) {
  const url = new URL("https://randomuser.me/api/")
  url.searchParams.set("page", page.toString())
  url.searchParams.set("results", results.toString())

  let response: Response
  try {
    response = await fetch(url.toString())
  } catch {
    // fetch throws on network failure (offline, DNS, CORS, etc.)
    // per spec, treat any request failure as "offline"
    throw new Error("offline")
  }

  if (!response.ok) {
    throw new Error("offline")
  }

  return (await response.json()) as UserResponse
}
