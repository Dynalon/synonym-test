import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { db } from "../cache"
import { fetchUsers } from "../restApi"
import { useUserStore } from "../store"
import { usePaginationStore } from "./pagination"
import { UserList } from "./user-list"

vi.mock("../restApi", () => ({
  fetchUsers: vi.fn(),
}))

vi.mock("../cache", () => ({
  db: {
    responses: {
      get: vi.fn(),
      put: vi.fn(),
    },
  },
}))

vi.mock("dexie-react-hooks", () => ({
  useLiveQuery: vi.fn(),
}))

import { useLiveQuery } from "dexie-react-hooks"

const mockUser = {
  gender: "female",
  name: { title: "Ms", first: "Jane", last: "Doe" },
  email: "jane.doe@example.com",
  picture: { thumbnail: "https://example.com/jane.jpg" },
  location: { city: "Berlin", state: "Berlin" },
  login: { uuid: "abc-123" },
}

const mockResponse = {
  results: [mockUser],
  info: { results: 1, page: 1 },
}

// the store is a module level singleton, so reset it between tests
beforeEach(() => {
  useUserStore.setState({
    loading: false,
    error: false,
    manualOffline: false,
    offline: false,
  })
  usePaginationStore.getState().reset()

  vi.mocked(useLiveQuery).mockReturnValue(undefined)
  vi.mocked(fetchUsers).mockResolvedValue(mockResponse)
  vi.mocked(db.responses.put).mockResolvedValue(1)
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe("UserList", () => {
  it("shows the spinner and hides the cards while loading", async () => {
    let resolveFetch!: (value: typeof mockResponse) => void
    vi.mocked(fetchUsers).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve
      })
    )

    render(<UserList />)

    expect(screen.getByRole("status", { name: "Loading users" })).toBeInTheDocument()
    expect(screen.queryByText(mockUser.email)).not.toBeInTheDocument()

    resolveFetch(mockResponse)

    await waitFor(() =>
      expect(screen.queryByRole("status", { name: "Loading users" })).not.toBeInTheDocument()
    )
  })

  it("hides the spinner and shows the cards once loaded", async () => {
    vi.mocked(useLiveQuery).mockReturnValue({ ...mockResponse, page: 1 })

    render(<UserList />)

    await waitFor(() =>
      expect(screen.queryByRole("status", { name: "Loading users" })).not.toBeInTheDocument()
    )
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
  })

  it("fetches users for the current page and caches the response", async () => {
    render(<UserList />)

    await waitFor(() => expect(fetchUsers).toHaveBeenCalledWith(1, expect.any(Number)))
    expect(db.responses.put).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1 })
    )
  })

  it("shows an error message when offline and the page is not cached", async () => {
    vi.mocked(fetchUsers).mockRejectedValue(new Error("offline"))

    render(<UserList />)

    expect(
      await screen.findByText("Page 1 not in cache and API unreachable")
    ).toBeInTheDocument()
  })
})
