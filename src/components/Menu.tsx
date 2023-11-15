import MenuItem from "./MenuItem"
import { ROUTES } from "@/constants/routes"

const Menu = () => {
  return (
    <section className="flex flex-col gap-4 items-center w-full">
      {ROUTES.map((item) => {
        return <MenuItem key={item.path} data={item} />
      })}
    </section>
  )
}

export default Menu
