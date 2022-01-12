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

const getMemberName = (uid: number) => {
  enum Member {
    "A-SOUL_Official" = 703007996,
    "向晚大魔王" = 672346917,
    "贝拉kira" = 672353429,
    "珈乐Carol" = 351609538,
    "嘉然今天吃什么" = 672328094,
    "乃琳Queen" = 672342685,
  }

  return Member[uid]
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
        <div className="bg-default6 fill absolute w-full h-full"></div>
        <div className="bg-default7 fill absolute w-full h-full"></div>
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
              styleClass={"w-60 h-60"}
            ></ProgressPlayer>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-white text-center">
              <span className="text-3xl">
                {unix(data.reply_first.time).format("YYYY年M月D日")}
              </span>
              ，你第一次在{" "}
              <span className="text-3xl">
                {getMemberName(data.reply_first.uid)}
              </span>{" "}
              的评论区发送回复，你说：
            </div>
            <div className="text-2xl text-white text-center shadow-xl bg-sky-900 border-solid w-full items-center justify-center flex rounded-lg border-2 relative max-w-2xl px-12 py-6 m-2">
              <ProgressPlayer
                src="qoute-lottie.json"
                progress={progress}
                maxFrame={100}
                styleClass={"w-10 h-10 absolute top-2 left-2"}
              ></ProgressPlayer>
              <span className="line-clamp-3">{data.reply_first.content}</span>
            </div>
            <div className="text-2xl text-white text-center">
              这是历史性的一刻！当时的心情，你还记得么？
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-slate-500 text-center">
              这一年，你在 A-SOUL 的{" "}
              <span className="text-3xl">{data.reply_total.dynamicNumber}</span>{" "}
              条动态中留下了属于你的足迹
            </div>
            <div className="text-2xl text-slate-500 text-center">
              一共发送了{" "}
              <span className="text-3xl">{data.reply_total.replyNumber}</span>{" "}
              条评论
            </div>
            <div className="text-2xl text-slate-500 text-center">
              超过了{" "}
              <span className="text-3xl">
                {(data.reply_total.rank * 100).toFixed(2)}%
              </span>{" "}
              的 AU
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-white text-center">
              你{" "}
              <span className="text-3xl">
                {unix(data.reply_max_used.time).format("YYYY年M月D日")}
              </span>{" "}
              发布在{" "}
              <span className="text-3xl">
                {getMemberName(data.reply_max_used.uid)}
              </span>{" "}
              评论区的：
            </div>
            <div className="text-2xl text-white text-center shadow-xl bg-sky-900 border-solid w-full items-center justify-center flex rounded-lg border-2 relative max-w-2xl px-12 py-6 m-2">
              <ProgressPlayer
                src="qoute-lottie.json"
                progress={progress}
                maxFrame={100}
                styleClass={"w-10 h-10 absolute top-2 left-2"}
              ></ProgressPlayer>
              <span className="line-clamp-3">
                {data.reply_max_used.content}
              </span>
            </div>
            <div className="text-2xl text-white text-center">
              被引用了{" "}
              <span className="text-3xl">{data.reply_max_used.usedNumber}</span>{" "}
              次
            </div>
            <div className="text-2xl text-white text-center">
              在AU中排前{" "}
              <span className="text-3xl">
                {(data.reply_max_used.rank * 100).toFixed(2)}%{" "}
              </span>
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-white text-center">
              你偏爱在{" "}
              <span className="text-3xl"> {data.reply_prefer_time.time} </span>
              发言
            </div>
            <div className="text-2xl text-white text-center">
              全年最{" "}
              <span className="text-3xl">{data.reply_prefer_time.time[0]}</span>{" "}
              发送评论的时刻定格于{" "}
              <span className="text-3xl">
                {data.reply_prefer_time.maxHour}:00
              </span>
            </div>
          </Content>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
