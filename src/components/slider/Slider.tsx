import type { FC } from "react"
import { useRef, useState } from "react"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import { Content } from "./SliderContent"
import SwiperCore, { EffectCreative } from "swiper"
import dayjs, { unix } from "dayjs"
import type { Data } from "~/interface"
import { ProgressPlayer } from "~/components/progress-player"

import "swiper/css"
import "swiper/css/effect-creative"

SwiperCore.use([EffectCreative])

type SliderProps = {
  data: Data
}

interface slide extends Element {
  progress: number
}

export const Slider: FC<SliderProps> = ({ data }) => {
  const [progress, setProgress] = useState(1)
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

  const onProgress = (swiper: SwiperCore, progress: number) => {
    const { slides } = swiper
    let activeProgress = (slides[swiper.activeIndex] as slide).progress
    if (activeProgress == 1) {
      setProgress(0)
    } else if (activeProgress == -1) {
      setProgress(0)
    } else {
      setProgress(activeProgress)
    }
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
        <div className="bg-default2 fill absolute w-full h-full"></div>
        <div className="bg-default3 fill absolute w-full h-full"></div>
        <div className="bg-default4 fill absolute w-full h-full"></div>
        <div className="bg-default5 fill absolute w-full h-full"></div>
      </div>
      <Swiper
        effect={"creative"}
        onSetTranslate={setTranslate}
        onSetTransition={setTransition}
        onProgress={onProgress}
        direction={"vertical"}
        autoHeight={true}
        className="mySwiper"
        watchSlidesProgress={true}
        creativeEffect={effect}
        grabCursor={true}
      >
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-slate-500 text-center">
              你好,{" "}
              <span className="text-3xl"> {data.user_info.username} </span>
            </div>
            <div className="text-2xl text-slate-500 text-center">
              从{" "}
              <span className="text-3xl">
                {unix(data.user_info.startTime).format("YYYY年M月D日")}
              </span>{" "}
              开始，你已经陪伴A-SOUL走过了{" "}
              <span className="text-3xl">
                {dayjs().diff(unix(data.user_info.startTime), "d")}
              </span>{" "}
              天
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-white text-center">
              这一年，AU 们一起发送了{" "}
              <span className="text-3xl"> {data.all.replyCount} </span>{" "}
              万条评论,
              <span className="text-3xl"> {data.all.danmuCount} </span> 万条弹幕
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-fuchsia-700 text-center">
              字数加起来相当于 <span className="text-3xl">800</span> 本西游记{" "}
            </div>
            <ProgressPlayer
              src="book-lottie.json"
              progress={progress}
              maxFrame={100}
            ></ProgressPlayer>
          </Content>
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
