import { create } from "zustand"
import { User } from "./types"

interface UserStore {
  users: User[]
  loading: boolean
  error: boolean
  setUsers: (users: User[]) => void
  setLoading: (val: boolean) => void
  setError: (val: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  page: 1,
  // TODO actual user merge + duplicate check?
  setUsers: (users: User[]) => set(() => ({ users: users })),
  loading: false,
  setLoading: (val: boolean) => set(() => ({ loading: val })),
  error: false,
  setError: (val: boolean) => set(() => ({ error: val })),
}))
