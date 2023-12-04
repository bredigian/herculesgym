"use client"

import Menu from "@/components/Menu"
import { ROUTES } from "@/constants/routes"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"

const Home = () => {
  return (
    <Screen>
      <Title>Bienvenido</Title>
      <Subtitle>
        A continuación se mostrará un conjunto de opciones con las que podrás
        interactuar para gestionar lo que desees
      </Subtitle>
      <Menu routes={ROUTES} />
    </Screen>
  )
}

export default Home
