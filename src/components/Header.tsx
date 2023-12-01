"use client"

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react"
import { FaUser, FaUserLock } from "react-icons/fa6"
import { PRIVATE_ROUTES, ROUTES } from "@/constants/routes"

import Image from "next/image"
import Link from "next/link"
import { UserRoles } from "@/types/user.types"
import logo from "@/assets/images/logoHercules.png"
import { useAuthStore } from "@/store/auth"
import { usePathname } from "next/navigation"
import { useState } from "react"

const Header = () => {
  const [theme, setTheme] = useState("bg-transparent")
  const pathname = usePathname()
  const { user, role, signOut } = useAuthStore()

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleTheme = () => {
    setTheme((prev) =>
      prev === "bg-transparent" ? "bg-purple-regular" : "bg-transparent"
    )
  }

  const logout = () => {
    signOut()
  }

  return (
    <Navbar
      classNames={{
        wrapper: `gap-4 px-6 h-20 duration-200`,
        menu: "pt-10",
        menuItem: "text-xl",
      }}
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={(open) => setIsMenuOpen(open)}
    >
      <NavbarContent justify="center">
        <NavbarMenuToggle onChange={handleTheme} />
      </NavbarContent>
      <NavbarContent>
        <Image src={logo} alt="Hércules Logo" width={60} height={60} />
      </NavbarContent>
      <NavbarContent justify="center">
        {role === UserRoles.USER ? (
          <FaUser className="text-base" />
        ) : (
          <FaUserLock className="text-base" />
        )}
        <p className="font-bold text-xs">{user?.name}</p>
      </NavbarContent>
      <NavbarMenu>
        {role === UserRoles.USER
          ? ROUTES.map((route) => {
              return (
                <Link key={route.path} href={route.path}>
                  <NavbarMenuItem
                    onClick={() => setIsMenuOpen(false)}
                    isActive={pathname === route.path}
                  >
                    {route.name}
                  </NavbarMenuItem>
                </Link>
              )
            })
          : PRIVATE_ROUTES.map((route) => {
              return (
                <Link key={route.path} href={route.path}>
                  <NavbarMenuItem
                    onClick={() => setIsMenuOpen(false)}
                    isActive={pathname === route.path}
                  >
                    {route.name}
                  </NavbarMenuItem>
                </Link>
              )
            })}
        <NavbarMenuItem onClick={onOpen} className="text-danger">
          Salir
        </NavbarMenuItem>
      </NavbarMenu>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>¿Estás seguro que deseas cerrar sesión?</ModalHeader>
          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={logout} className="text-white bg-purple-bold">
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Navbar>
  )
}

export default Header
