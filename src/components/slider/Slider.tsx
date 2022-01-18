import type { FC } from "react"
import { useRef, useState } from "react"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import { Content, Wraper } from "./SliderContent"
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

const getFansName = (uid: number) => {
  enum Member {
    "草学长" = 703007996,
    "顶碗人" = 672346917,
    "贝极星" = 672353429,
    "皇珈骑士" = 351609538,
    "嘉心糖" = 672328094,
    "奶淇琳" = 672342685,
  }

  return Member[uid]
}

const getPrefix = (time: string) => {
  if (time === "凌晨" || time === "上午") return "早"
  else return "晚"
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
    const totalProgress = progress * (swiper.slides.length - 1)
    const progressNum = totalProgress - Math.trunc(totalProgress)
    setProgress(progressNum)
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
        <Wraper background={"bg-default1"} />
        <Wraper background={"bg-default2"} />
        <Wraper background={"bg-default3"} />
        <Wraper background={"bg-default4"} />
        <Wraper background={"bg-default5"} />
        {data.reply_max_like.likeNumber && (
          <Wraper background={"bg-default8"} />
        )}
        <Wraper background={"bg-default6"} />
        {data.reply_max_send_one_day.maxSendNumber && (
          <Wraper background={"bg-default9"} />
        )}
        <Wraper background={"bg-default7"} />
        <Wraper background={"bg-default10"} />
        {data.danmu_total.scNumber && <Wraper background={"bg-default12"} />}
        <Wraper background={"bg-default11"} />
      </div>
      <Swiper
        effect={"creative"}
        onSetTranslate={setTranslate}
        onSetTransition={setTransition}
        onProgress={onProgress}
        direction={"vertical"}
        autoHeight={true}
        mousewheel={true}
        className="mySwiper"
        watchSlidesProgress={true}
        creativeEffect={effect}
      >
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-slate-500 text-center">
              你好,{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {" "}
                {data.user_info.username}{" "}
              </span>
            </div>
            <div className="text-2xl text-slate-500 text-center">
              从{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {unix(data.user_info.startTime).format("YYYY年M月D日")}
              </span>{" "}
              开始
            </div>
            <div className="text-2xl text-slate-500 text-center">
              你已经陪伴A-SOUL走过了{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
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
              <span className="text-3xl font-noto-serif-sc font-bold">
                {" "}
                {data.all.replyCount}万{" "}
              </span>{" "}
              条评论,
              <span className="text-3xl font-noto-serif-sc font-bold">
                {" "}
                {data.all.danmuCount}万{" "}
              </span>{" "}
              条弹幕
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-slate-500 text-center">
              字数加起来相当于{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">800</span>{" "}
              本西游记{" "}
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
              <span className="text-3xl font-noto-serif-sc font-bold">
                {unix(data.reply_first.time).format("YYYY年M月D日")}
              </span>
              ，你第一次在{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {getMemberName(data.reply_first.uid)}
              </span>{" "}
              的评论区发送回复，你说：
            </div>
            <div className="text-2xl text-white text-center shadow-xl bg-emerald-700 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-14 py-6 my-2">
              <ProgressPlayer
                src="qoute-lottie.json"
                progress={progress}
                maxFrame={100}
                styleClass={"w-10 h-10 absolute bottom-2 right-2"}
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
              <span className="text-3xl font-noto-serif-sc font-bold">
                {data.reply_total.dynamicNumber}
              </span>{" "}
              条动态中留下了属于你的足迹
            </div>
            <div className="text-2xl text-slate-500 text-center">
              一共发送了{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {data.reply_total.replyNumber}
              </span>{" "}
              条评论
            </div>
            <div className="text-2xl text-slate-500 text-center">
              超过了{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {(data.reply_total.rank * 100).toFixed(2)}%
              </span>{" "}
              的 AU
            </div>
          </Content>
        </SwiperSlide>
        {data.reply_max_like.likeNumber && (
          <SwiperSlide>
            <Content>
              <div className="text-2xl text-white text-center">
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_max_like.time).format("YYYY年M月D日")}
                </span>
                ，你发布在{" "}
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_max_like.uid)}
                </span>{" "}
                评论区的:
              </div>
              <div className="text-2xl text-white text-center shadow-xl bg-lime-600 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-12 py-6 my-2">
                <ProgressPlayer
                  src="qoute-lottie.json"
                  progress={progress}
                  maxFrame={100}
                  styleClass={"w-10 h-10 absolute buttom-2 right-2"}
                ></ProgressPlayer>
                <span className="line-clamp-3">
                  {data.reply_max_like.content}
                </span>
              </div>
              <div className="text-2xl text-white text-center">
                包含被引用的，累计获得了{" "}
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {data.reply_max_like.likeNumber}
                </span>{" "}
                个点赞,
              </div>
              <div className="text-2xl text-white text-center">
                在 AU 中取得了前{" "}
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {(data.reply_max_like.rank * 100).toFixed(2)}%
                </span>{" "}
                的好成绩!
              </div>
            </Content>
          </SwiperSlide>
        )}
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-white text-center">
              你{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {unix(data.reply_max_used.time).format("YYYY年M月D日")}
              </span>{" "}
              发布在{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {getMemberName(data.reply_max_used.uid)}
              </span>{" "}
              评论区的：
            </div>
            <div className="text-2xl text-white text-center shadow-xl bg-sky-900 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-12 py-6 my-2">
              <ProgressPlayer
                src="qoute-lottie.json"
                progress={progress}
                maxFrame={100}
                styleClass={"w-10 h-10 absolute buttom-2 right-2"}
              ></ProgressPlayer>
              <span className="line-clamp-3">
                {data.reply_max_used.content}
              </span>
            </div>
            <div className="text-2xl text-white text-center">
              被引用了{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {data.reply_max_used.usedNumber}
              </span>{" "}
              次
            </div>
            <div className="text-2xl text-white text-center">
              在AU中排前{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {(data.reply_max_used.rank * 100).toFixed(2)}%{" "}
              </span>
            </div>
          </Content>
        </SwiperSlide>
        {data.reply_max_send_one_day.maxSendNumber && (
          <SwiperSlide>
            <Content>
              <div className="text-2xl text-white text-center">
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {dayjs(data.reply_max_send_one_day.date, "YYYY-MM-DD").format(
                    "YYYY年M月D日",
                  )}
                </span>
                ，你狂发了{" "}
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {data.reply_max_send_one_day.maxSendNumber}
                </span>{" "}
                条评论，其中一条是
              </div>
              <div className="text-2xl text-white text-center shadow-xl bg-zinc-900 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-12 py-6 my-2">
                <ProgressPlayer
                  src="qoute-lottie.json"
                  progress={progress}
                  maxFrame={100}
                  styleClass={"w-10 h-10 absolute buttom-2 right-2"}
                ></ProgressPlayer>
                <span className="line-clamp-3">
                  {data.reply_max_send_one_day.content}
                </span>
              </div>
              <div className="text-2xl text-white text-center">
                这一定是令你难忘的一天
              </div>
            </Content>
          </SwiperSlide>
        )}
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-teal-800 text-center">
              你偏爱在{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {" "}
                {data.reply_prefer_time.time}{" "}
              </span>
              发言
            </div>
            <div className="text-2xl text-teal-800 text-center">
              全年最{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {getPrefix(data.reply_prefer_time.time)}
              </span>{" "}
              发送评论的时刻定格于{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {data.reply_prefer_time.time} {data.reply_prefer_time.maxHour}{" "}
                点
              </span>
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-white text-center">
              这一年，你一共发送了{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {" "}
                {data.danmu_total.danmuNumber}{" "}
              </span>
              条弹幕
            </div>
            <div className="text-2xl text-white text-center">
              其中发给
              <span className="text-3xl font-noto-serif-sc font-bold">
                {" "}
                {getMemberName(data.danmu_total.memberUid)}{" "}
              </span>
              的有{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {data.danmu_total.memberDanmuNumber}{" "}
              </span>
              条
            </div>
            <div className="text-2xl text-white text-center">
              你一定是个{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                {`铁血${getFansName(data.danmu_total.memberUid)}`}{" "}
              </span>
              吧
            </div>
          </Content>
        </SwiperSlide>
        {data.danmu_total.scNumber && (
          <SwiperSlide>
            <Content>
              <div className="text-2xl text-white text-center">
                这一年, 你一共购买了{" "}
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.scNumber}{" "}
                </span>{" "}
                次醒目留言
              </div>
              <div className="text-2xl text-white text-center">
                一共花了{" "}
                <span className="text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.scCost}元{" "}
                </span>{" "}
              </div>
              <div className="text-2xl text-white text-center">
                要理性消费，好好吃饭哟
              </div>
            </Content>
          </SwiperSlide>
        )}
        <SwiperSlide>
          <Content>
            <div className="text-2xl text-slate-500 text-center">
              这是你的{" "}
              <span className="text-3xl font-noto-serif-sc font-bold">
                勋章墙
              </span>
              <div className="text-2xl text-white text-center shadow-xl bg-zinc-300 border-solid rounded-lg border-2 p-4 my-2 grid grid-cols-2 md:grid-cols-3 grid-flow-row">
                {data.medal.map(item => (
                  <div className="mx-2 h-[20vh] md:h-[30vh] flex flex-col justify-center items-center">
                    <img className="h-[75%]" src={`/badge/${item.name}.svg`} />
                    <div className="text-xl font-serif font-black text-slate-500 text-center">{`LV.${item.level}`}</div>
                  </div>
                ))}
              </div>
              <div className="text-2xl text-slate-500 text-center">
                在这个永不通关的游戏里
              </div>
              <div className="text-2xl text-slate-500 text-center">
                还有很多成就等着你继续去解锁
              </div>
            </div>
          </Content>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
