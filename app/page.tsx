import { UsersView } from "./usersview"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="items-top justify-left flex w-full max-w-300 flex-col bg-white px-16 py-32">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
            Users
          </h1>
          <UsersView />
        </div>
      </main>
    </div>
  )
}
