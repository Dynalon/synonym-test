import { create } from "zustand"
import { User } from "./types"

interface UsersState {
  users: User[]
  loading: boolean
  error: boolean
}

interface UsersAction {
  setUsers: (users: User[]) => void
  setLoading: (val: boolean) => void
  setError: (val: boolean) => void
}

type UserStore = UsersState & UsersAction

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  // TODO actual user merge + duplicate check?
  setUsers: (users: User[]) => set(() => ({ users: users })),
  loading: false,
  setLoading: (val: boolean) => set(() => ({ loading: val })),
  error: false,
  setError: (val: boolean) => set(() => ({ error: val })),
}))
