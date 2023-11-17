const Screen = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-start gap-10 p-6">{children}</main>
  )
}

export default Screen
