"use client"

import Menu from "@/components/Menu"
import { PRIVATE_ROUTES } from "@/constants/routes"
import PrivateScreen from "@/components/PrivateScreen"
import Schedule from "@/components/Schedule"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"

const Home = () => {
  return (
    <PrivateScreen>
      <Title>Administrador</Title>
      <Subtitle>
        Seleccioná la opción que desees administrar. Además, debajo aparecerá el
        cronograma para el día de hoy
      </Subtitle>
      <Menu routes={PRIVATE_ROUTES} />
      <Schedule />
    </PrivateScreen>
  )
}

export default Home
