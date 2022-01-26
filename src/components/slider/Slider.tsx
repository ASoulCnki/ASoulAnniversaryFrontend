import type { FC } from "react"
import { useRef, useState } from "react"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import { Content, Wraper } from "./SliderContent"
import SwiperCore, { EffectCreative, Mousewheel, Lazy } from "swiper"
import dayjs, { unix } from "dayjs"
import type { Data } from "~/interface"

import {
  getFansName,
  getPrefix,
  getStartTime,
  getMemberName,
} from "~/helpers/filter"

import "swiper/css"
import "swiper/css/effect-creative"

SwiperCore.use([Mousewheel, EffectCreative, Lazy])

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
      translate: [0, -256, 0],
    },
    next: {
      opacity: 0,
      translate: [0, 256, 0],
    },
  }

  const setTransition = (swiper: SwiperCore, speed: number) => {
    if (fills.current) {
      fills.current.childNodes.forEach(ele => {
        ;(ele as HTMLElement).style.transitionDuration = `${speed}ms`
      })
    }
  }

  const setTranslate = (swiper: SwiperCore) => {
    const { slides } = swiper
    if (fills.current) {
      fills.current.childNodes.forEach((ele, index) => {
        const progress = (slides[index] as slide).progress
        const rate = 1 - Math.max(Math.min(Math.abs(progress), 1), 0)
        ;(ele as HTMLElement).style.clipPath =
          progress < 0 ? `circle(${Math.round(rate * 75)}%)` : "circle(75%)"
      })
    }
  }

  return (
    <div className="relative h-full">
      <div className="fills absolute w-[100vw] h-[200vh]" ref={fills}>
        <Wraper background={"bg-default1"} />
        <Wraper background={"bg-default2 bg-[length:auto_60%]"} />
        <Wraper background={"bg-default3"} />
        {data.reply_first !== null && <Wraper background={"bg-default4"} />}
        {data.reply_total !== null && <Wraper background={"bg-default5"} />}
        {data.reply_max_like !== null &&
          data.reply_max_like.likeNumber !== 0 && (
            <Wraper background={"bg-default6"} />
          )}
        {data.reply_max_used !== null &&
          data.reply_max_used.usedNumber !== 0 && (
            <Wraper background={"bg-default7 bg-[#0E2A47]"} />
          )}
        {data.reply_max_send_one_day !== null &&
          data.reply_max_send_one_day.maxSendNumber !== 0 && (
            <Wraper background={"bg-default8"} />
          )}
        {data.reply_prefer_time !== null && (
          <Wraper background={"bg-default9"} />
        )}
        {data.danmu_total !== null && <Wraper background={"bg-default10"} />}
        {data.danmu_total !== null && data.danmu_total.scNumber !== 0 && (
          <Wraper background={"bg-default11"} />
        )}
        {data.medal.length !== 0 && <Wraper background={"bg-default12"} />}
        {data.reply_total !== null && (
          <Wraper background={"bg-result bg-cover"} />
        )}
      </div>
      <Swiper
        effect={"creative"}
        onSetTranslate={setTranslate}
        onSetTransition={setTransition}
        direction={"vertical"}
        mousewheel={true}
        className="mySwiper"
        watchSlidesProgress={true}
        creativeEffect={effect}
        grabCursor={true}
        lazy={{
          loadPrevNext: true,
        }}
      >
        {getStartTime(data.user_data) !== -1 ? (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                你好，{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.user_data.username}{" "}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                从{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(getStartTime(data.user_data)).format("YYYY年M月D日")}
                </span>{" "}
                开始
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                你已经陪伴A-SOUL走过了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {dayjs().diff(unix(getStartTime(data.user_data)), "d")}
                </span>{" "}
                天
              </div>
              <div className="absolute w-full h-10 bottom-10 left-0 flex justify-center items-center z-10">
                <div className="bg-arrow h-8 w-8 bg-no-repeat animate-arrow"></div>
              </div>
            </Content>
          </SwiperSlide>
        ) : (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                你好，{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.user_data.username}{" "}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                截至到数据统计时，你似乎还没有关注ASOUL的成员
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                喜欢的话，不妨关注一下五位姑娘哦～
              </div>
              <div className="absolute w-full h-10 bottom-10 left-0 flex justify-center items-center z-10">
                <div className="bg-arrow h-8 w-8 bg-no-repeat animate-arrow"></div>
              </div>
            </Content>
          </SwiperSlide>
        )}
        <SwiperSlide>
          <Content>
            <div className="text-xl sm:text-2xl text-white text-center">
              这一年，AU 们一起发送了{" "}
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {" "}
                {Math.round(data.all.replyCount / 10000)}万{" "}
              </span>{" "}
              条评论，
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {" "}
                {Math.round(data.all.danmuCount / 10000)}万{" "}
              </span>{" "}
              条弹幕
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-xl sm:text-2xl text-slate-500 text-center">
              字数加起来相当于{" "}
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {Math.round(
                  (data.all.danmuCount + data.all.replyCount) / 580000,
                )}
              </span>{" "}
              本西游记{" "}
            </div>
            <div className="text-xl sm:text-2xl text-slate-500 text-center">
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {Math.round(
                  (data.all.danmuCount + data.all.replyCount) / 3600000,
                )}
              </span>{" "}
              套莎士比亚全集{" "}
            </div>
            <div className="text-xl sm:text-2xl text-slate-500 text-center">
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {Math.round(
                  (data.all.danmuCount + data.all.replyCount) / 14000000,
                )}
              </span>{" "}
              部中国通史{" "}
            </div>
            <img className="w-36 swiper-lazy" data-src="/book.svg" />
          </Content>
        </SwiperSlide>
        {data.reply_first.time !== null ? (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_first.time).format("YYYY年M月D日")}
                </span>
                ，你第一次在{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_first.uid)}
                </span>{" "}
                的评论区发送回复，你说：
              </div>
              <div className="text-xl sm:text-2xl text-white text-center shadow-xl bg-emerald-700 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-14 py-6 my-2">
                <div className="absolute right-0 bottom-0">
                  <img className="w-12 swiper-lazy" data-src="/qoute.svg" />
                </div>
                <span className="line-clamp-3 text-left whitespace-pre-line">
                  {data.reply_first.content}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                这是历史性的一刻！当时的心情，你还记得么？
              </div>
            </Content>
          </SwiperSlide>
        ) : (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                相比于表达，你似乎更偏爱思考
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                不妨试一试让自己强大的思考力登上更高的舞台？
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                期待明年你活跃的表现！
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_total !== null && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                这一年，你在 A-SOUL 的{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_total.dynamicNumber}
                </span>{" "}
                条动态中留下了属于你的足迹
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                一共发送了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_total.replyNumber}
                </span>{" "}
                条评论
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                超过了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {(100 - data.reply_total.rank * 100).toFixed(2)}%
                </span>{" "}
                的 AU
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_max_like !== null && data.reply_max_like.likeNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_max_like.time).format("YYYY年M月D日")}
                </span>
                ，你发布在{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_max_like.uid)}
                </span>{" "}
                评论区的:
              </div>
              <div className="text-xl sm:text-2xl text-white text-center shadow-xl bg-lime-600 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-12 py-6 my-2">
                <div className="absolute right-0 bottom-0">
                  <img className="w-12 swiper-lazy" data-src="/qoute.svg" />
                </div>
                <span className="line-clamp-3 text-left whitespace-pre-line">
                  {data.reply_max_like.content}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                包含被引用的，累计获得了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_max_like.likeNumber}
                </span>{" "}
                个点赞，
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                在 AU 中取得了前{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {(data.reply_max_like.rank * 100).toFixed(2)}%
                </span>{" "}
                的好成绩!
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_max_used !== null && data.reply_max_used.usedNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                你{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_max_used.time).format("YYYY年M月D日")}
                </span>{" "}
                发布在{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_max_used.uid)}
                </span>{" "}
                评论区的：
              </div>
              <div className="text-xl sm:text-2xl text-white text-center shadow-xl bg-sky-900 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-12 py-6 my-2">
                <div className="absolute right-0 bottom-0">
                  <img className="w-12 swiper-lazy" data-src="/qoute.svg" />
                </div>
                <span className="line-clamp-3 text-left whitespace-pre-line">
                  {data.reply_max_used.content}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                被引用了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_max_used.usedNumber}
                </span>{" "}
                次
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                在AU中排前{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {(data.reply_max_used.rank * 100).toFixed(2)}%{" "}
                </span>
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_max_send_one_day !== null &&
          data.reply_max_send_one_day.maxSendNumber !== 0 && (
            <SwiperSlide>
              <Content>
                <div className="text-xl sm:text-2xl text-white text-center">
                  <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                    {dayjs(
                      data.reply_max_send_one_day.date,
                      "YYYY-MM-DD",
                    ).format("YYYY年M月D日")}
                  </span>
                  ，你狂发了{" "}
                  <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                    {data.reply_max_send_one_day.maxSendNumber}
                  </span>{" "}
                  条评论，其中一条是
                </div>
                <div className="text-xl sm:text-2xl text-white text-center shadow-xl bg-zinc-900 border-solid w-full items-center justify-center flex rounded-lg border-2 relative px-12 py-6 my-2">
                  <div className="absolute right-0 bottom-0">
                    <img className="w-12 swiper-lazy" data-src="/qoute.svg" />
                  </div>
                  <span className="line-clamp-3 text-left whitespace-pre-line">
                    {data.reply_max_send_one_day.content}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl text-white text-center">
                  这一定是令你难忘的一天
                </div>
              </Content>
            </SwiperSlide>
          )}
        {data.reply_prefer_time !== null && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-teal-800 text-center">
                你偏爱在{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.reply_prefer_time.time}{" "}
                </span>
                发言
              </div>
              <div className="text-xl sm:text-2xl text-teal-800 text-center">
                全年最{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getPrefix(data.reply_prefer_time.time)}
                </span>{" "}
                发送评论的时刻定格于{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_prefer_time.time} {data.reply_prefer_time.maxHour}{" "}
                  点
                </span>
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.danmu_total && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                这一年，你一共发送了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.danmu_total.danmuNumber}{" "}
                </span>
                条弹幕
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                其中发给
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {getMemberName(data.danmu_total.memberUid)}{" "}
                </span>
                的有{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.memberDanmuNumber}{" "}
                </span>
                条
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                你一定是个{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {`铁血${getFansName(data.danmu_total.memberUid)}`}{" "}
                </span>
                吧
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.danmu_total && data.danmu_total.scNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                这一年，你一共购买了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.scNumber}{" "}
                </span>{" "}
                次醒目留言
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                一共花了{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.scCost}元{" "}
                </span>{" "}
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                要理性消费，好好吃饭哟
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.medal.length !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                这是你的{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  勋章墙
                </span>
                <div className="text-center shadow-xl bg-zinc-300 border-solid rounded-lg border-2 p-4 my-2 grid grid-cols-2 md:grid-cols-3 grid-flow-row">
                  {data.medal.map((item, index) => (
                    <div
                      key={index}
                      className="mx-2 flex flex-col justify-center items-center"
                    >
                      <img
                        className="h-24 xl:h-36 swiper-lazy"
                        data-src={`/badge/${item.name}.svg`}
                      />
                      <div className="text-xl font-serif font-black text-slate-500 text-center">{`LV.${item.level}`}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xl sm:text-2xl text-slate-500 text-center">
                  在这个永不通关的游戏里
                </div>
                <div className="text-xl sm:text-2xl text-slate-500 text-center">
                  还有很多成就等着你继续去解锁
                </div>
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_total !== null && (
          <SwiperSlide>
            <Content>
              <div className="shadow-xl bg-neutral-800 border-solid  justify-center flex rounded-lg border-2 border-neutral-700 flex-col p-6 sm:p-12 relative">
                <div className="absolute top-2 right-0 w-12">
                  <img className="swiper-lazy" data-src="/badge.svg" />
                </div>
                <div className="text-3xl sm:text-4xl text-neutral-300 pb-4 text-center font-zcool">
                  枝网年度报告
                </div>
                {getStartTime(data.user_data) !== -1 ? (
                  <div className="sm:text-xl text-neutral-300">
                    <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                      {unix(getStartTime(data.user_data)).format(
                        "YYYY年M月D日",
                      )}
                    </span>{" "}
                    ，<br className="block md:hidden" />
                    是你与 ASOUL 相遇的时间
                  </div>
                ) : (
                  <div className="sm:text-xl text-neutral-300">
                    <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                      2020年12月11日
                    </span>{" "}
                    ，<br className="block md:hidden" />是 ASOUL
                    与我们相遇的时间
                  </div>
                )}
                <div className="sm:text-xl text-neutral-300">
                  今年里，你一共发了 <br className="block md:hidden" />
                  <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                    {data.reply_total.replyNumber}
                  </span>{" "}
                  条评论、
                  <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                    {data.danmu_total !== null
                      ? data.danmu_total.danmuNumber
                      : 0}
                  </span>{" "}
                  条弹幕
                  <br />
                  无论是真情实感、偷的小作文，
                  <br className="block md:hidden" />
                  亦或者是诈骗链接，
                  <br className="hidden md:block" />
                  相信你都在
                  <br className="block md:hidden" />
                  用自己的方式表达着喜爱。
                </div>
                <div className="sm:text-xl text-neutral-300">
                  {data.danmu_total &&
                    (data.danmu_total.giftNumber !== 0 ||
                      data.danmu_total.scNumber !== 0) && (
                      <>
                        你在直播间中
                        {data.danmu_total.giftNumber !== 0 && (
                          <>
                            送出了{" "}
                            <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                              {data.danmu_total.giftNumber}
                            </span>{" "}
                            次礼物，
                          </>
                        )}
                        {data.danmu_total.scNumber !== 0 && (
                          <>
                            <br className="block md:hidden" />
                            发送了{" "}
                            <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                              {data.danmu_total.scNumber}
                            </span>{" "}
                            次醒目留言，
                          </>
                        )}
                        <br />
                        总共花费{" "}
                        <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                          {data.danmu_total.giftCost + data.danmu_total.scCost}
                        </span>{" "}
                        元 ，<br className="block md:hidden" />
                        要记得理性消费哦。
                        <br />
                      </>
                    )}
                </div>
                <div className="sm:text-xl text-neutral-300">
                  这一年，我们与 ASOUL 共同
                  <br className="block md:hidden" />
                  经历了很多快乐的时光，
                  <br />
                  希望你能记住那些瞬间，
                  <br className="block md:hidden" />与 ASOUL 一起继续向前进发～
                </div>
              </div>
            </Content>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
