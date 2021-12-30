import type { RefObject } from "react"

import { useState, useMemo, useEffect, useCallback } from "react"

export const useStickySectionProgress = (wrapperRef: RefObject<HTMLElement>, sectionRef: RefObject<HTMLElement>, containerRef?: RefObject<HTMLElement>) => {
  const [wrapperRectTop, setWrapperRectTop] = useState(0)
  const [sectionRectTop, setSectionRectTop] = useState(0)

  const wrapper = wrapperRef.current
  const section = sectionRef.current

  const handleContainerScoll = useCallback(() => {
    if (wrapper) {
      setWrapperRectTop(wrapper.getBoundingClientRect().top)
    }
    if (section) {
      setSectionRectTop(section.getBoundingClientRect().top)
    }
  }, [section, wrapper])

  useEffect(() => {
    const container = containerRef?.current ?? window
    container.addEventListener("scroll", handleContainerScoll)
    return () => container.removeEventListener("scroll", handleContainerScoll)
  }, [containerRef, handleContainerScoll])

  const distance = sectionRectTop - wrapperRectTop
  const unit = window.innerHeight / 100
  const progress = useMemo(() => distance / unit, [distance, unit])

  return [progress] as const
}
