import { StrictMode } from "react"

import type { FC } from "react"

export const Global: FC = ({ children }) => {
  return (
    <StrictMode>
      {children}
    </StrictMode>
  )
}
