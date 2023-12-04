import MenuItem from "./MenuItem"
import { Route } from "@/types/route.types"

const Menu = ({ routes }: { routes: Route[] }) => {
  return (
    <section className="flex flex-col gap-4 items-center w-full">
      {routes.map((item) => {
        if (item.path !== "/") {
          if (item.path !== "/administrator")
            return <MenuItem key={item.path} data={item} />
        }
      })}
    </section>
  )
}

export default Menu
