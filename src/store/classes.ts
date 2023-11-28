import { API_URL } from "@/constants/api"
import { Class } from "@/types/classes.types"
import { Date } from "@/types/date.types"
import { Inscription } from "@/types/inscription.types"
import { Schedule } from "@/types/schedule.types"
import { create } from "zustand"
import { toast } from "sonner"

export const useClassesStore = create((set: any) => ({
  classes: [] as Class[],

  getClasses: async (tomorrow: Date) => {
    const response = await fetch(
      `${API_URL}/classes?weekday=${tomorrow?.weekday}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const { message, classes }: { message: string; classes: Class[] } =
      await response.json()
    if (!response.ok) throw new Error(message)

    set({ classes })
  },

  registerClass: async (inscription: Inscription) => {
    const response = await fetch(`${API_URL}/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inscription),
    })

    const { message } = await response.json()
    if (!response.ok) throw new Error(message)

    toast.success(message)
  },
}))
