import { create } from "zustand"

interface UserStore {
  loading: boolean
  error: boolean
  manualOffline: boolean
  offline: boolean
  setLoading: (val: boolean) => void
  setError: (val: boolean) => void
  toggleManualOffline: () => void
}

function computeOffline(
  loading: boolean,
  error: boolean,
  manualOffline: boolean
): boolean {
  return manualOffline || (!loading && error)
}

export const useUserStore = create<UserStore>((set, get) => ({
  loading: false,
  error: false,
  manualOffline: false,
  offline: false,

  setLoading: (val: boolean) =>
    set(() => {
      const { error, manualOffline } = get()
      return {
        loading: val,
        offline: computeOffline(val, error, manualOffline),
      }
    }),

  setError: (val: boolean) =>
    set(() => {
      const { loading, manualOffline } = get()
      return {
        error: val,
        offline: computeOffline(loading, val, manualOffline),
      }
    }),

  toggleManualOffline: () =>
    set((state) => {
      const nextManualOffline = !state.manualOffline
      return {
        manualOffline: nextManualOffline,
        offline: computeOffline(state.loading, state.error, nextManualOffline),
      }
    }),
}))
