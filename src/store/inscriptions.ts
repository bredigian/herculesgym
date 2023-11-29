import { API_URL } from "@/constants/api"
import { Date } from "@/types/date.types"
import { Inscription } from "@/types/inscription.types"
import { create } from "zustand"
import { toast } from "sonner"

export const useInscriptionsStore = create((set: any) => ({
  inscriptions: [] as Inscription[],

  getInscriptions: async (_id: string, tomorrow: Date) => {
    const response = await fetch(
      `${API_URL}/inscriptions?id=${_id}&date=${JSON.stringify(tomorrow)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const { message, inscriptions } = await response.json()
    if (!response.ok) throw new Error(message)

    set({ inscriptions })
  },

  createInscription: async (inscription: Inscription) => {
    const response = await fetch(`${API_URL}/inscriptions`, {
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

  deleteInscription: async (_id: string) => {
    const response = await fetch(`${API_URL}/inscriptions?id=${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { message } = await response.json()
    if (!response.ok) throw new Error(message)

    toast.success(message)
  },
}))
