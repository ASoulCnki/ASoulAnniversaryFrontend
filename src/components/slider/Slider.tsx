import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import type { FC } from "react"
import { Content } from "./SliderContent"

import "swiper/css"
import type { Data } from "~/interface"

import SwiperCore from "swiper"
import { useRef } from "react"

type SliderProps = {
  data: Data
}

interface slide extends Element {
  progress: number
}

interface fillNode extends ChildNode {
  style: CSSStyleDeclaration
}

export const Slider: FC<SliderProps> = ({ data }) => {
  const fills = useRef<HTMLInputElement | null>(null)
  const effect = {
    progressMultiplier: 2,
    prev: {
      opacity: 0,
      translate: [0, -128, 0],
    },
    next: {
      opacity: 0,
      translate: [0, 128, 0],
    },
  }

  const setTransition = (swiper: SwiperCore, speed: number) => {
    fills.current?.childNodes.forEach(ele => {
      ;(ele as any).style.transitionDuration = `${speed}ms`
    })
  }

  const setTranslate = (swiper: SwiperCore) => {
    const { slides } = swiper
    fills.current?.childNodes.forEach((ele, index) => {
      const progress = (slides[index] as slide).progress
      const rate = 1 - Math.max(Math.min(Math.abs(progress), 1), 0)
      ;(ele as HTMLElement).style.transform =
        progress < 0 ? `scale(${rate})` : "scale(1)"
    })
  }

  return (
    <div className="relative">
      <div
        className="fills absolute w-[400vw] h-[400vh] ml-[-150vw] mt-[-50vh]"
        ref={fills}
      >
        <div className="fill absolute bg-slate-500 w-full h-full rounded-full"></div>
        <div className="fill absolute bg-lime-200 w-full h-full rounded-full scale-0"></div>
        <div className="fill absolute bg-sky-500 w-full h-full rounded-full scale-0"></div>
        <div className="fill absolute bg-teal-500 w-full h-full rounded-full scale-0"></div>
        <div className="fill absolute bg-fuchsia-400 w-full h-full rounded-full scale-0"></div>
      </div>
      <Swiper
        onSetTranslate={setTranslate}
        onSetTransition={setTransition}
        direction={"vertical"}
        autoHeight={true}
        className="mySwiper"
        watchSlidesProgress={true}
        creativeEffect={effect}
        speed={800}
      >
        <SwiperSlide>
          <Content>{data.reply_first.content}</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 2</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 3</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 4</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 5</Content>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
