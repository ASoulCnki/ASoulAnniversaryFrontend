import { createContext } from "react"

export type EffectStickyContextValue = {
  scrollY: number
}

export const defaultEffectStickyContextValue: EffectStickyContextValue = {
  scrollY: 0
}

export const EffectStickyContext = createContext<EffectStickyContextValue>(defaultEffectStickyContextValue)
