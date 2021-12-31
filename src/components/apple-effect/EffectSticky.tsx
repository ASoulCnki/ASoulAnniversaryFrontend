import type { CSSProperties, FC, ReactElement, RefObject } from "react"

import { useState, useRef, useEffect, useMemo } from "react"
// import { EffectStickyContext } from "./EffectStickyContext"

type EffectStickyProps = {
  max: number
  refRoot?: RefObject<HTMLDivElement>
  children: (scrollY: number) => ReactElement
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
        const wrapperTop = wrapper.getBoundingClientRect().top
        const sectionTop = section.getBoundingClientRect().top
        setDistance(sectionTop - wrapperTop)
      }
    }

    root.addEventListener("scroll", handleWindowScoll)
    return () => {
      root.removeEventListener("scroll", handleWindowScoll)
    }
  }, [max, refRoot])

  const progress = useMemo(() => distance / (window.innerHeight / 100), [distance])

  return (
    <div style={wrapperStyles} ref={refWrapper}>
      <div style={sectionStyles} ref={refSection}>
        {/* <EffectStickyContext.Provider value={{ progress }}> */}
        {children(progress)}
        {/* </EffectStickyContext.Provider> */}
      </div>
    </div>
  )
}
