"use client"

import { useEffect, useState } from "react"

import ScreenLoader from "./ScreenLoader"
import { UserRoles } from "@/types/user.types"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next-nprogress-bar"

const Screen = ({
  children,
  isAuth,
}: {
  children: React.ReactNode
  isAuth?: boolean
}) => {
  const { role } = useAuthStore()
  const { push } = useRouter()

  const [verifying, setVerifying] = useState(true)

  useEffect(() => {
    if (!isAuth) {
      if (role !== UserRoles.USER) push("administrator")
      else setVerifying(false)
    }
  }, [])

  if (!isAuth && verifying) return <ScreenLoader />

  return (
    <main className="flex flex-col items-start gap-10 p-6">{children}</main>
  )
}

export default Screen
