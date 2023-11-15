import { IoFlash } from "react-icons/io5"

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-black font-medium">{children}</h1>
      <IoFlash className="text-xl" />
    </div>
  )
}

export default Title
