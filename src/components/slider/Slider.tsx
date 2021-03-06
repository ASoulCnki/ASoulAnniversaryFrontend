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
        {data.danmu_total !== null && data.danmu_total.danmuNumber !== 0 && (
          <Wraper background={"bg-default10"} />
        )}
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
                ?????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.user_data.username}{" "}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ???{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(getStartTime(data.user_data)).format("YYYY???M???D???")}
                </span>{" "}
                ??????
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ???????????????A-SOUL?????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {dayjs().diff(unix(getStartTime(data.user_data)), "d")}
                </span>{" "}
                ???
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
                ?????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.user_data.username}{" "}
                </span>
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ??? 2020???12???11??? ??????
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                A-SOUL ?????????????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {dayjs().diff(unix(1607688000), "d")}
                </span>{" "}
                ???
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
              ????????????AU ??????????????????{" "}
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {" "}
                {Math.round(data.all.replyCount / 10000)}???{" "}
              </span>{" "}
              ????????????
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {" "}
                {Math.round(data.all.danmuCount / 10000)}???{" "}
              </span>{" "}
              ?????????
            </div>
          </Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>
            <div className="text-xl sm:text-2xl text-slate-500 text-center">
              ????????????????????????{" "}
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {Math.round(
                  (data.all.danmuCount + data.all.replyCount) / 580000,
                )}
              </span>{" "}
              ????????????{" "}
            </div>
            <div className="text-xl sm:text-2xl text-slate-500 text-center">
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {Math.round(
                  (data.all.danmuCount + data.all.replyCount) / 3600000,
                )}
              </span>{" "}
              ?????????????????????{" "}
            </div>
            <div className="text-xl sm:text-2xl text-slate-500 text-center">
              <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                {Math.round(
                  (data.all.danmuCount + data.all.replyCount) / 14000000,
                )}
              </span>{" "}
              ???????????????{" "}
            </div>
            <img className="w-36 swiper-lazy" data-src="/book.svg" />
          </Content>
        </SwiperSlide>
        {data.reply_first.time !== null ? (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_first.time).format("YYYY???M???D???")}
                </span>
                ??????????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_first.uid)}
                </span>{" "}
                ????????????????????????????????????
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
                ???????????????????????????????????????????????????????????????
              </div>
            </Content>
          </SwiperSlide>
        ) : (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                ??????????????????????????????????????????
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ??????????????????????????????????????????????????????????????????
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ?????????????????????????????????
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_total !== null && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ?????????????????? A-SOUL ???{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_total.dynamicNumber}
                </span>{" "}
                ???????????????????????????????????????
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ???????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_total.replyNumber}
                </span>{" "}
                ?????????
              </div>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ?????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {(100 - data.reply_total.rank * 100).toFixed(2)}%
                </span>{" "}
                ??? AU
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_max_like !== null && data.reply_max_like.likeNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_max_like.time).format("YYYY???M???D???")}
                </span>
                ???????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_max_like.uid)}
                </span>{" "}
                ????????????:
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
                ????????????????????????????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_max_like.likeNumber}
                </span>{" "}
                ????????????
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ??? AU ???????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {(data.reply_max_like.rank * 100).toFixed(2)}%
                </span>{" "}
                ????????????!
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.reply_max_used !== null && data.reply_max_used.usedNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                ???{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {unix(data.reply_max_used.time).format("YYYY???M???D???")}
                </span>{" "}
                ?????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getMemberName(data.reply_max_used.uid)}
                </span>{" "}
                ???????????????
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
                ????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_max_used.usedNumber}
                </span>{" "}
                ???
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ???AU?????????{" "}
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
                    ).format("YYYY???M???D???")}
                  </span>
                  ???????????????{" "}
                  <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                    {data.reply_max_send_one_day.maxSendNumber}
                  </span>{" "}
                  ???????????????????????????
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
                  ?????????????????????????????????
                </div>
              </Content>
            </SwiperSlide>
          )}
        {data.reply_prefer_time !== null && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-teal-800 text-center">
                ????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.reply_prefer_time.time}{" "}
                </span>
                ??????
              </div>
              <div className="text-xl sm:text-2xl text-teal-800 text-center">
                ?????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {getPrefix(data.reply_prefer_time.time)}
                </span>{" "}
                ??????????????????????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.reply_prefer_time.time} {data.reply_prefer_time.maxHour}{" "}
                  ???
                </span>
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.danmu_total !== null && data.danmu_total.danmuNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                ??????????????????????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {data.danmu_total.danmuNumber}{" "}
                </span>
                ?????????
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ????????????
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {" "}
                  {getMemberName(data.danmu_total.memberUid)}{" "}
                </span>
                ??????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.memberDanmuNumber}{" "}
                </span>
                ???
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ???????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {`??????${getFansName(data.danmu_total.memberUid)}`}{" "}
                </span>
                ???
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.danmu_total && data.danmu_total.scNumber !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-white text-center">
                ??????????????????????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.scNumber}{" "}
                </span>{" "}
                ???????????????
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  {data.danmu_total.scCost}???{" "}
                </span>{" "}
              </div>
              <div className="text-xl sm:text-2xl text-white text-center">
                ?????????????????????????????????
              </div>
            </Content>
          </SwiperSlide>
        )}
        {data.medal.length !== 0 && (
          <SwiperSlide>
            <Content>
              <div className="text-xl sm:text-2xl text-slate-500 text-center">
                ????????????{" "}
                <span className="text-2xl sm:text-3xl font-noto-serif-sc font-bold">
                  ?????????
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
                  ?????????????????????????????????
                </div>
                <div className="text-xl sm:text-2xl text-slate-500 text-center">
                  ??????????????????????????????????????????
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
                  ??????????????????
                </div>
                {getStartTime(data.user_data) !== -1 ? (
                  <div className="sm:text-xl text-neutral-300">
                    <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                      {unix(getStartTime(data.user_data)).format(
                        "YYYY???M???D???",
                      )}
                    </span>{" "}
                    ???<br className="block md:hidden" />
                    ????????? ASOUL ???????????????
                  </div>
                ) : (
                  <div className="sm:text-xl text-neutral-300">
                    <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                      2020???12???11???
                    </span>{" "}
                    ???<br className="block md:hidden" />??? ASOUL
                    ????????????????????????
                  </div>
                )}
                <div className="sm:text-xl text-neutral-300">
                  ??????????????????????????? <br className="block md:hidden" />
                  <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                    {data.reply_total.replyNumber}
                  </span>{" "}
                  ????????????
                  <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                    {data.danmu_total !== null
                      ? data.danmu_total.danmuNumber
                      : 0}
                  </span>{" "}
                  ?????????
                  <br />
                  ??????????????????????????????????????????
                  <br className="block md:hidden" />
                  ???????????????????????????
                  <br className="hidden md:block" />
                  ???????????????
                  <br className="block md:hidden" />
                  ????????????????????????????????????
                </div>
                <div className="sm:text-xl text-neutral-300">
                  {data.danmu_total &&
                    (data.danmu_total.giftNumber !== 0 ||
                      data.danmu_total.scNumber !== 0) && (
                      <>
                        ??????????????????
                        {data.danmu_total.giftNumber !== 0 && (
                          <>
                            ?????????{" "}
                            <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                              {data.danmu_total.giftNumber}
                            </span>{" "}
                            ????????????
                          </>
                        )}
                        {data.danmu_total.scNumber !== 0 && (
                          <>
                            <br className="block md:hidden" />
                            ?????????{" "}
                            <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                              {data.danmu_total.scNumber}
                            </span>{" "}
                            ??????????????????
                          </>
                        )}
                        <br />
                        ????????????{" "}
                        <span className="text-xl text-neutral-500 sm:text-2xl font-noto-serif-sc font-bold">
                          {data.danmu_total.giftCost + data.danmu_total.scCost}
                        </span>{" "}
                        ??? ???<br className="block md:hidden" />
                        ???????????????????????????
                        <br />
                      </>
                    )}
                </div>
                <div className="sm:text-xl text-neutral-300">
                  ????????????????????? ASOUL ??????
                  <br className="block md:hidden" />
                  ?????????????????????????????????
                  <br />
                  ?????????????????????????????????
                  <br className="block md:hidden" />??? ASOUL ???????????????????????????
                </div>
              </div>
            </Content>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
