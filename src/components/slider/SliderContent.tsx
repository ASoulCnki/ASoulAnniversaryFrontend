import type { FC } from "react"

export const Content: FC = ({ children }) => {
  return <div className="flex justify-center items-center">{children}</div>
}
