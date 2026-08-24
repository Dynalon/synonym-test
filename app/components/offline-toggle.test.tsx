import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { useUserStore } from "../store"
import { OfflineToggleButton } from "./offline-toggle"

// the store is a module level singleton, so reset it between tests
beforeEach(() => {
  useUserStore.setState({
    loading: false,
    error: false,
    manualOffline: false,
    offline: false,
  })
})

afterEach(cleanup)

describe("OfflineToggleButton", () => {
  it("renders the online state by default", () => {
    render(<OfflineToggleButton />)

    const button = screen.getByRole("button", { name: "Go offline" })
    expect(button).toHaveAttribute("data-variant", "outline")
  })

  it("goes offline when clicked", async () => {
    const user = userEvent.setup()
    render(<OfflineToggleButton />)

    await user.click(screen.getByRole("button", { name: "Go offline" }))

    expect(useUserStore.getState().offline).toBe(true)
    expect(useUserStore.getState().manualOffline).toBe(true)
    const button = screen.getByRole("button", { name: "Go back online" })
    expect(button).toHaveAttribute("data-variant", "destructive")
  })

  it("goes back online on a second click", async () => {
    const user = userEvent.setup()
    render(<OfflineToggleButton />)

    const button = screen.getByRole("button", { name: "Go offline" })
    await user.click(button)
    await user.click(screen.getByRole("button", { name: "Go back online" }))

    expect(useUserStore.getState().offline).toBe(false)
    expect(useUserStore.getState().manualOffline).toBe(false)
  })
})
