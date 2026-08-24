import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { InfinitePagination, usePaginationStore } from "./pagination"

// the store is a module level singleton, so reset it between tests
beforeEach(() => {
  usePaginationStore.getState().reset()
})

afterEach(cleanup)

describe("usePaginationStore", () => {
  it("starts on page 1", () => {
    expect(usePaginationStore.getState().page).toBe(1)
  })

  it("increments the page", () => {
    usePaginationStore.getState().nextPage()
    expect(usePaginationStore.getState().page).toBe(2)
  })

  it("does not go below page 1", () => {
    usePaginationStore.getState().prevPage()
    expect(usePaginationStore.getState().page).toBe(1)
  })

  it("sets the page and clamps values below 1", () => {
    usePaginationStore.getState().setPage(3)
    expect(usePaginationStore.getState().page).toBe(3)

    usePaginationStore.getState().setPage(0)
    expect(usePaginationStore.getState().page).toBe(1)
  })

  it("resets back to the initial state", () => {
    usePaginationStore.setState({ page: 7 })
    usePaginationStore.getState().reset()

    expect(usePaginationStore.getState().page).toBe(1)
  })
})

describe("InfinitePagination", () => {
  it("renders the page window and marks the current page", () => {
    render(<InfinitePagination />)

    for (const page of ["1", "2", "3", "4", "5"]) {
      expect(screen.getByText(page)).toBeInTheDocument()
    }
    expect(screen.getByText("1")).toHaveAttribute(
      "aria-current",
      "page"
    )
  })

  it("jumps to a clicked page", async () => {
    const user = userEvent.setup()
    render(<InfinitePagination />)

    await user.click(screen.getByText("3"))

    expect(usePaginationStore.getState().page).toBe(3)
    expect(screen.getByText("3")).toHaveAttribute(
      "aria-current",
      "page"
    )
  })

  it("advances to the next page", async () => {
    const user = userEvent.setup()
    render(<InfinitePagination />)

    await user.click(screen.getByLabelText("Go to next page"))

    expect(usePaginationStore.getState().page).toBe(2)
  })

  it("disables the previous control on the first page", async () => {
    const user = userEvent.setup()
    render(<InfinitePagination />)

    const previous = screen.getByLabelText("Go to previous page")
    expect(previous).toHaveAttribute("aria-disabled", "true")

    await user.click(previous)
    expect(usePaginationStore.getState().page).toBe(1)
  })
})
