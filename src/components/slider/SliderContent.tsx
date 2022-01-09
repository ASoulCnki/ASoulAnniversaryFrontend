import type { FC } from "react"

export const Content: FC = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  )
}
