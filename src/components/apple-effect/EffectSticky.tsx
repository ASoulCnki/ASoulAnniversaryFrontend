import type { RefObject } from "preact"
import type { CSSProperties, FC } from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { EffectStickyContext } from "./EffectStickyContext"

type EffectStickyProps = {
  max: number
  refRoot?: RefObject<HTMLDivElement>
}

export const EffectSticky: FC<EffectStickyProps> = ({ children, max = 200, refRoot }) => {
  const [distance, setDistance] = useState(0)

  const refWrapper = useRef<HTMLDivElement>(null)
  const refSection = useRef<HTMLDivElement>(null)

  const wrapperStyles: CSSProperties = {
    width: "100%",
    height: window.innerHeight * (max / 20 + 1)
  }

  const sectionStyles: CSSProperties = {
    height: window.innerHeight,
    position: "sticky",
    top: 0
  }

  useEffect(() => {
    const root = refRoot?.current ?? window
    console.log(root)
    const wrapper = refWrapper.current
    const section = refSection.current

    const handleWindowScoll = () => {
      if (wrapper && section) {
        const distance = - (wrapper.getBoundingClientRect().top - section.getBoundingClientRect().top)
        const value = distance / (window.innerHeight / 20)
        setDistance(value)
      }
    }
    root.addEventListener("scroll", handleWindowScoll)
    return () => {
      root.removeEventListener("scroll", handleWindowScoll)
    }
  }, [max, refRoot])

  const scrollY = useMemo(() => distance, [distance])

  return (
    <div style={wrapperStyles} ref={refWrapper}>
      <div style={sectionStyles} ref={refSection}>
        <EffectStickyContext.Provider value={{ scrollY }}>
          {children}
        </EffectStickyContext.Provider>
      </div>
    </div>
  )
}
