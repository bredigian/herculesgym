import { User, UserRoles } from "@/types/user.types"

import { API_URL } from "@/constants/api"
import { create } from "zustand"

export const useAuthStore = create((set: any) => ({
  user: null as User | null,
  token: null as string | null,
  role: null as UserRoles | null,

  signUp: async (userdata: User) => {
    const response = await fetch(`${API_URL}/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
    const {
      user,
      token,
      message,
    }: { user: User; token: string; message: string } = await response.json()
    if (!response.ok) throw new Error(message)

    localStorage.setItem("token", token)
    localStorage.setItem("user_id", user._id as string)
    set({ user })
  },

  signIn: async (userdata: User) => {
    const response = await fetch(`${API_URL}/authentication/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
    const {
      user,
      token,
      message,
    }: { user: User; token: string; message: string } = await response.json()
    if (!response.ok) throw new Error(message)

    localStorage.setItem("token", token)
    localStorage.setItem("user_id", user._id as string)
    set({ user, token, role: user.role })
  },

  signOut: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")

    set({ token: null, user: null })
  },

  verifySession: async () => {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")

    if (!token || !user_id) set({ token: null, user: null })
    else {
      const response = await fetch(
        `${API_URL}/authentication/verify?token=${token}&user_id=${user_id}`,
        {
          method: "GET",
        }
      )

      if (!response.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")

        set({ token: null, user: null })
      } else {
        const { user }: { user: User } = await response.json()
        set({ user, token, role: user.role })
      }
    }
  },
}))
