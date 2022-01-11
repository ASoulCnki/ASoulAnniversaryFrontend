import type { FC } from "react"

export const Content: FC = ({ children }) => {
  return (
    <div className="text-3xl text-white h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  )
}
