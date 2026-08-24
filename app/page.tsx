import { DarkModeToggleButton } from "./components/dark-mode-toggle"
import { OfflineToggleButton } from "./components/offline-toggle"
import { UserList } from "./components/user-list"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background font-sans">
      <main className="items-top justify-left flex w-full max-w-300 flex-col bg-card px-16 py-32">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex w-full justify-between">
            <h1 className="text-3xl leading-10 font-semibold tracking-tight text-foreground">
              Users
            </h1>
            <div className="flex items-center gap-2">
              <OfflineToggleButton />
              <DarkModeToggleButton />
            </div>
          </div>
          <UserList />
        </div>
      </main>
    </div>
  )
}
