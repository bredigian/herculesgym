"use client"

import { UserRoles } from "@/types/user.types"
import { useAuthStore } from "@/store/auth"
import { useEffect } from "react"
import { useRouter } from "next-nprogress-bar"

const Screen = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthStore()
  const { push } = useRouter()

  useEffect(() => {
    if (role === UserRoles.USER) push("/")
    else push("/administrator")
  }, [])

  console.log(role)

  return (
    <main className="flex flex-col items-start gap-10 p-6">{children}</main>
  )
}

export default Screen
