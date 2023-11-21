"use client"

import { useEffect, useState } from "react"

import { Auth } from "@/screens/Auth"
import Header from "@/components/Header"
import { NextUIProvider } from "@nextui-org/react"
import ScreenLoader from "@/components/ScreenLoader"
import { Toaster } from "sonner"
import { useAuthStore } from "@/store/auth"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { user, verifySession } = useAuthStore()
  const [loading, setLoading] = useState(true)

  const verify = async () => {
    try {
      await verifySession()
    } catch (error) {}
    setLoading(false)
  }

  useEffect(() => {
    verify()
  }, [])

  if (loading) return <ScreenLoader />

  return (
    <NextUIProvider>
      {!user ? (
        <Auth />
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
      <Toaster theme="light" />
    </NextUIProvider>
  )
}

export default Providers
