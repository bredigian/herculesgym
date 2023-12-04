import { API_URL } from "@/constants/api"
import { Class } from "@/types/classes.types"
import { Date } from "@/types/date.types"
import { create } from "zustand"

export const useClassesStore = create((set: any) => ({
  classes: [] as Class[],

  getClasses: async (day: Date) => {
    const response = await fetch(`${API_URL}/classes?weekday=${day?.weekday}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { message, classes }: { message: string; classes: Class[] } =
      await response.json()
    if (!response.ok) throw new Error(message)

    set({ classes })
  },
}))
