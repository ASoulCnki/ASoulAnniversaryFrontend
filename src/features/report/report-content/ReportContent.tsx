import { useRef } from "react"
import useSWR from "swr"
import dayjs, { unix } from "dayjs"

import { EffectSticky } from "~/components/apple-effect"
// import { EffectStickyItem } from "~/components/apple-effect/EffectStickyItem"
import { ProgressPlayer } from "~/components/progress-player/ProgressPlayer"

import type { ReportResponse } from "~/interface"
import {
  isBetween,
  makeRatioLinear,
  makeRatioEnter,
  makeRatioLeave,
  makeRatioEnterAndLeave,
} from "~/components/apple-effect/ratio"
import { useStickySectionProgress } from "~/components/apple-effect/useStickyScrollY"

import type { FC } from "react"
import {
  createReportResource,
  createReportResourceFake,
} from "./createReportResource"
import { reportResponse } from "~/mocks/handlers/report"
// const linearIn = (progress: number, factor: number) => Math.min(progress * (1 / factor), 1)

// const linearOut = (progress: number, factor: number) => Math.min(1 / factor - progress * (1 / factor), 1)

// const linearInOut = (progress: number, factor: number) => progress <= 0.5
//   ? linearIn(progress, factor)
//   : linearOut(progress, factor)

// const subProgress = (progress: number, from: number, to: number) => (progress - from) / (to - from)

type ReportContentProps = {
  reportData: ReportResponse
}

export const ReportContent: FC<ReportContentProps> = ({ reportData }) => {
  const { data } = reportData

  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)

  const [progress1] = useStickySectionProgress(wrapperRef, sectionRef)

  const makeScrollThroughLinearLeaveStyles = (
    progress: number,
    from: number,
    to: number,
    ptc: number,
  ) => ({
    transform: `translateY(${-makeRatioLeave(progress, from, to, ptc) * 25}vh)`,
  })

  return (
    <div className="">
      {data && (
        <>
          <div className="w-full h-[200vh]">
            <div className="w-full h-[100vh]">
              <div
                className="h-full absolute inset-0 bg-cover  bg-default1"
                style={{ opacity: makeRatioLeave(progress1, 0, 200, 0.25) }}
              />
              {isBetween(progress1, 0, 100) && (
                <div className="h-full absolute inset-0 flex flex-col justify-center items-center">
                  <div
                    style={{
                      opacity: makeRatioLeave(progress1, 0, 100, 0.15),
                      transform: `translateY(${
                        -makeRatioLinear(progress1, 0, 100) * 25
                      }vh)`,
                    }}
                  >
                    <p className="my-5 text-5xl text-white">
                      你好，{data.all.dynamicCount}
                    </p>
                  </div>
                </div>
              )}

              {/* <EffectStickyItem from={0} to={150}>
            {progress => <div className="h-full absolute inset-0 bg-cover  bg-default1" style={{ opacity: linearOut(progress, 0.2) }}/>}
          </EffectStickyItem>
          <EffectStickyItem from={125} to={250}>
            {progress => <div className="h-full absolute inset-0 bg-default2" style={{ opacity: linearInOut(progress, 0.2) }} /> }
          </EffectStickyItem>

          <EffectStickyItem from={0} to={50}>
            {progress => <div className="h-full absolute inset-0 flex flex-col justify-center items-center">
              <div style={{ opacity: linearOut(progress, 0.2), transform: `translateY(${-progress * 50}%)` }}>
                <p className="my-5 text-5xl text-white" >你好，{data.name}</p>
              </div>
            </div>}
          </EffectStickyItem>
          <EffectStickyItem from={50} to={100}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div style={{ opacity: linearInOut(progress, 0.2), transform: `translateY(${-progress * 50}%)` }}>
                <div className="my-5 text-2xl text-white" >从<span className="text-3xl">{unix(data.start_from).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了<span className="text-5xl">{dayjs().diff(unix(data.start_from), "d")}</span>天</div>
              </div>
            </div>}
          </EffectStickyItem>
          <EffectStickyItem from={100} to={150}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative" style={{ bottom: progress * 64, opacity: linearInOut(progress, 0.2) }}>
                <div className="my-5 text-3xl text-white" >感谢有你陪伴的每一天</div>
              </div>
            </div>}
          </EffectStickyItem>
          <EffectStickyItem from={140} to={200}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative" style={{ bottom: progress * 64, opacity: linearInOut(progress, 0.2) }}>
                <div className="my-5 text-3xl text-fuchsia-700" >这一年，AU 们一起发送了</div>
                <div className="my-5 text-3xl text-fuchsia-700" ><span className="text-5xl">294万</span>条评论</div>
                <div className="my-5 text-3xl text-fuchsia-700" > <span className="text-5xl">2677万</span> 条弹幕</div>
                <ProgressPlayer
                  src="/ohhhhh.json"
                  maxFrame={60}
                  progress={progress}
                />
              </div>
            </div>}
          </EffectStickyItem>

          <EffectStickyItem from={200} to={250}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative" style={{ bottom: progress * 64, opacity: linearInOut(progress, 0.2) }}>
                <div className="my-5 text-2xl text-fuchsia-700" >字数加起来相当于 <span className="text-5xl">800</span> 本西游记, </div>
                <ProgressPlayer
                  maxFrame={115}
                  src="/book-lottie.json"
                  progress={progress}
                />
              </div>
            </div>}
          </EffectStickyItem>

          <EffectStickyItem from={0} to={400}>
            {progress => <span className="w-10 h-10 text-white fixed inset-0">{progress * 400}</span>}
          </EffectStickyItem> */}

              {/*
          <EffectStickyItem from={0} to={50}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative top-10" style={{}}>
                <p>{progress * 200}</p>
                <div className="my-5 text-3xl text-fuchsia-100"  >你好0，{data.name}</div>
                <div className="my-5 text-2xl text-fuchsia-100"  >从<span className="text-5xl">{unix(data.start_from).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了{dayjs().diff(unix(data.start_from), "d")}天</div>
              </div>
            </div>}
          </EffectStickyItem> */}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

{
  /* <Slide id={1} containerRef={containerRef}>
          {(ratio => <div className="w-full h-full flex flex-col justify-center items-center bg-default2">
            <div className="relative top-10">
              <div className="my-5 text-3xl text-fuchsia-300 ">你好1，{data.name}, {ratio}</div>
              <div className="my-5 text-2xl text-fuchsia-100">从<span className="text-5xl">{unix(data.start_from).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了{dayjs().diff(unix(data.start_from), "d")}天</div>
            </div>
          </div>
          )}
        </Slide>
        <Slide id={2} containerRef={containerRef}>
          {(ratio => <div className="w-full h-full flex flex-col justify-center items-center bg-fixed  bg-default3">
            <div className="apple-effect-text" >
              <div className="my-5 text-3xl text-fuchsia-300 ">你好2，{data.name}, {ratio}</div>
              <div className="my-5 text-2xl text-fuchsia-100">从<span className="text-5xl">{unix(data.start_from).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了{dayjs().diff(unix(data.start_from), "d")}天</div>
            </div>
          </div>
          )}
        </Slide> */
}

// { data && <EffectSticky virtualHeight={400}>
//   <EffectStickyElement from={0} to={100}>
//     {(progress => <div className="w-full h-full absolute inset-0 bg-cover  bg-default1" />)}
//   </EffectStickyElement>
//   <EffectStickyElement from={100} to={200}>
//     {(progress => <div className="w-full h-full  absolute inset-0 bg-default2" />)}
//   </EffectStickyElement>
//   <EffectStickyElement from={200} to={300}>
//     {(progress => <div className="w-full h-full absolute inset-0 bg-fixed bg-default3" />)}
//   </EffectStickyElement>
//   <EffectStickyElement from={0} to={400}>
//     {(progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
//       <div className="relative top-10" style={{}}>
//         <p>{progress}</p>
//         <div className="my-5 text-3xl bg-apple-text bg-size-apple-text bg-clip-text text-transparent" style={{ backgroundPositionX: `${100 - progress / 4}%` }} >你好0，{data.name}</div>
//         <div className="my-5 text-2xl bg-apple-text bg-size-apple-text bg-clip-text text-transparent" style={{ backgroundPositionX: `${100 - progress / 4}%` }} >从<span className="text-5xl">{unix(data.start_from).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了{dayjs().diff(unix(data.start_from), "d")}天</div>
//       </div>
//     </div>
//     )}
//   </EffectStickyElement>
// </EffectSticky>