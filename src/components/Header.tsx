"use client"

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"

import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import logo from "@/assets/images/logoHercules.png"
import { useState } from "react"

const Header = () => {
  const [theme, setTheme] = useState("bg-transparent")
  const pathname = usePathname()

  const handleTheme = () => {
    setTheme((prev) =>
      prev === "bg-transparent" ? "bg-purple-regular" : "bg-transparent"
    )
  }

  return (
    <Navbar
      classNames={{
        wrapper: `gap-4 px-6 h-20 duration-200`,
        menu: "pt-10",
        menuItem: "text-xl",
      }}
      isBlurred
    >
      <NavbarContent justify="center">
        <NavbarMenuToggle onChange={handleTheme} />
      </NavbarContent>
      <NavbarContent>
        <Image src={logo} alt="Hércules Logo" width={60} height={60} />
      </NavbarContent>
      <NavbarContent justify="end">
        <p className="font-bold text-sm">Gianluca Bredice</p>
      </NavbarContent>
      <NavbarMenu>
        {ROUTES.map((route) => {
          return (
            <Link key={route.path} href={route.path}>
              <NavbarMenuItem isActive={pathname === route.path}>
                {route.name}
              </NavbarMenuItem>
            </Link>
          )
        })}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
