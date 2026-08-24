import { beforeEach, describe, expect, it } from "vitest"

import { useUserStore } from "./store"

// the store is a module level singleton, so reset it between tests
beforeEach(() => {
  useUserStore.setState({
    loading: false,
    error: false,
    manualOffline: false,
    offline: false,
  })
})

describe("useUserStore", () => {
  it("starts with everything false", () => {
    const state = useUserStore.getState()
    expect(state.loading).toBe(false)
    expect(state.error).toBe(false)
    expect(state.manualOffline).toBe(false)
    expect(state.offline).toBe(false)
  })

  it("setLoading does not mark offline on its own", () => {
    useUserStore.getState().setLoading(true)

    expect(useUserStore.getState().loading).toBe(true)
    expect(useUserStore.getState().offline).toBe(false)
  })

  it("setError marks offline when not loading", () => {
    useUserStore.getState().setError(true)

    expect(useUserStore.getState().error).toBe(true)
    expect(useUserStore.getState().offline).toBe(true)
  })

  it("setError does not mark offline while loading", () => {
    useUserStore.getState().setLoading(true)
    useUserStore.getState().setError(true)

    expect(useUserStore.getState().offline).toBe(false)
  })

  it("toggleManualOffline marks offline even when loading and error are false", () => {
    useUserStore.getState().toggleManualOffline()

    expect(useUserStore.getState().manualOffline).toBe(true)
    expect(useUserStore.getState().offline).toBe(true)

    useUserStore.getState().toggleManualOffline()

    expect(useUserStore.getState().manualOffline).toBe(false)
    expect(useUserStore.getState().offline).toBe(false)
  })

  it("manualOffline keeps offline true regardless of loading/error", () => {
    useUserStore.getState().toggleManualOffline()
    useUserStore.getState().setError(false)
    useUserStore.getState().setLoading(true)

    expect(useUserStore.getState().offline).toBe(true)
  })
})
