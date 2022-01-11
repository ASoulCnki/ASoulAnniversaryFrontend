import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import type { FC } from "react"
import { Content } from "./SliderContent"

import type { Data } from "~/interface"

import "swiper/css"
import "swiper/css/effect-creative"

import SwiperCore, { EffectCreative } from "swiper"
import { useRef } from "react"

SwiperCore.use([EffectCreative])

type SliderProps = {
  data: Data
}

interface slide extends Element {
  progress: number
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
      ;(ele as HTMLElement).style.clipPath =
        progress < 0 ? `circle(${Math.round(rate * 75)}%)` : "circle(75%)"
    })
  }

  return (
    <div className="relative">
      <div className="fills absolute w-[100vw] h-[200vh]" ref={fills}>
        <div className="bg-default1 fill absolute w-full h-full"></div>
        <div className="bg-default2 fill absolute bg-white w-full h-full"></div>
        <div className="bg-default3 fill absolute w-full h-full"></div>
        <div className="bg-default4 fill absolute w-full h-full"></div>
        <div className="bg-default5 fill absolute w-full h-full"></div>
      </div>
      <Swiper
        effect={"creative"}
        onSetTranslate={setTranslate}
        onSetTransition={setTransition}
        direction={"vertical"}
        autoHeight={true}
        className="mySwiper"
        watchSlidesProgress={true}
        creativeEffect={effect}
        grabCursor={true}
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
