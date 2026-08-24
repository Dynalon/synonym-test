import { create } from "zustand"
import { User } from "./types"

interface UserStore {
  loading: boolean
  error: boolean
  setLoading: (val: boolean) => void
  setError: (val: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  loading: false,
  setLoading: (val: boolean) => set(() => ({ loading: val })),
  error: false,
  setError: (val: boolean) => set(() => ({ error: val })),
}))
