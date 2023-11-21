import { ConnectionStates, connect, connection } from "mongoose"
import { DB_NAME, MONGO_URL } from "@/constants/api"

const connectionState = {
  isConnected: ConnectionStates.uninitialized,
}

export const connectToDB = async () => {
  if (connectionState.isConnected === ConnectionStates.connected) return

  const db = await connect(MONGO_URL as string, {
    dbName: DB_NAME,
  })
  connectionState.isConnected = db.connection.readyState
}

connection.on("connected", () => {
  console.log("Database ✅")
})

connection.on("error", () => {
  console.log("Database ❌")
})
