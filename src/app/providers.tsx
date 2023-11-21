"use client"

import { useEffect, useState } from "react"

import { AppProgressBar } from "next-nprogress-bar"
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
      <AppProgressBar
        height="4px"
        color="#3B3F77"
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
      <Toaster theme="light" />
    </NextUIProvider>
  )
}

export default Providers
