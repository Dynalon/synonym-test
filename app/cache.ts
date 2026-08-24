import { Dexie, EntityTable } from "dexie"
import { UserResponse } from "./types"

interface CachedUserResponse extends UserResponse {
  page: number // duplicated top-level for indexing/primary key purposes
}

export const db = new Dexie("UserCache") as Dexie & {
  responses: EntityTable<CachedUserResponse, "page">
}

db.version(1).stores({
  responses: "&page",
})
