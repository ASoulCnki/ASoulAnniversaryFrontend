import type { FC } from "react"

export const Content: FC = ({ children }) => {
  return (
    <div className="px-8 h-screen w-screen flex justify-center items-center flex-col">
      {children}
    </div>
  )
}
