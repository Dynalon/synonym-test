import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ThemeProvider } from "@/components/theme-provider"

import { DarkModeToggleButton } from "./dark-mode-toggle"

// next-themes resolves the "system" theme via matchMedia, which jsdom
// does not implement. Mock it to always report a light system preference.
beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove("dark")
  localStorage.clear()
})

describe("DarkModeToggleButton", () => {
  it("starts in light mode", async () => {
    render(
      <ThemeProvider>
        <DarkModeToggleButton />
      </ThemeProvider>
    )

    expect(await screen.findByText("Dark mode")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Switch to dark mode"
    )
    expect(document.documentElement).not.toHaveClass("dark")
  })

  it("switches to dark mode when clicked", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <DarkModeToggleButton />
      </ThemeProvider>
    )

    await user.click(await screen.findByRole("button"))

    expect(await screen.findByText("Light mode")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Switch to light mode"
    )
    expect(document.documentElement).toHaveClass("dark")
  })

  it("switches back to light mode on a second click", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <DarkModeToggleButton />
      </ThemeProvider>
    )

    const button = await screen.findByRole("button")
    await user.click(button)
    await user.click(button)

    expect(await screen.findByText("Dark mode")).toBeInTheDocument()
    expect(document.documentElement).not.toHaveClass("dark")
  })
})
