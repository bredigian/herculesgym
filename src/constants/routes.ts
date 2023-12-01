import { FaCalendarPlus } from "react-icons/fa6"
import { FaCheckSquare } from "react-icons/fa"
import { IoCube } from "react-icons/io5"
import { Route } from "@/types/route.types"

export const ROUTES: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Clases",
    path: "/classes",
    icon: FaCalendarPlus,
  },
  {
    name: "Packs",
    path: "/packs",
    icon: IoCube,
  },
  {
    name: "Cronograma",
    path: "/inscriptions",
    icon: FaCheckSquare,
  },
]

export const PRIVATE_ROUTES: Route[] = [
  {
    name: "Inicio",
    path: "/administrator",
  },
  {
    name: "Clases",
    path: "/administrator/classes",
    icon: FaCalendarPlus,
  },
  {
    name: "Packs",
    path: "/administrator/packs",
    icon: IoCube,
  },
]
