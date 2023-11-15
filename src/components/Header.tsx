import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"

import Image from "next/image"
import logo from "@/assets/images/logoHercules.png"

const Header = () => {
  return (
    <Navbar
      classNames={{
        wrapper: "gap-4 px-6 h-20",
      }}
    >
      <NavbarContent justify="center">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent>
        <Image src={logo} alt="Hércules Logo" width={60} height={60} />
      </NavbarContent>
      <NavbarContent justify="end">
        <p className="font-bold text-sm">Gianluca Bredice</p>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>Inicio</NavbarMenuItem>
        <NavbarMenuItem>Clases</NavbarMenuItem>
        <NavbarMenuItem>Inscripciones</NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
