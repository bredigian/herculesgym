import { Button } from "@nextui-org/react"
import { Route } from "@/types/route.types"
import { useRouter } from "next-nprogress-bar"

const MenuItem = ({ data }: { data: Route }) => {
  const { push } = useRouter()

  const IconComponent = data.icon as React.ElementType

  return (
    <Button
      onClick={() => push(data.path)}
      className="w-4/5 h-14 bg-purple-regular text-[16px] font-medium"
      startContent={<IconComponent className="text-lg" />}
    >
      {data.name}
    </Button>
  )
}

export default MenuItem
