import type { FC, ReactElement } from "react"
import { useContext } from "react"
import { EffectStickyContext } from "./EffectStickyContext"

type EffectStickyItemProps = {
  from: number
  to: number
  children: (progress: number) => ReactElement
}

export const EffectStickyItem: FC<EffectStickyItemProps> = ({ children, from, to }) => {
  const { scrollY } = useContext(EffectStickyContext)
  const isBetween = scrollY >= from && scrollY <= to
  const progress = (scrollY - from) / (to - from)
  return isBetween ? children(progress) : null
}
