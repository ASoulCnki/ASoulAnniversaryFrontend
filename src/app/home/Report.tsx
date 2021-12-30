import useSWR from "swr"
import dayjs, { unix } from "dayjs"

import { EffectSticky } from "~/components/apple-effect"
import { EffectStickyItem } from "~/components/apple-effect/EffectStickyItem"
import { Book, Qoute } from "~/components/apple-effect/progress-player"

import type { FC } from "react"
import type { ReportResponse } from "~/interface"

const linearIn = (progress: number, factor: number) => Math.min(progress * (1 / factor), 1)

const linearOut = (progress: number, factor: number) => Math.min(1 / factor - progress * (1 / factor), 1)

const linearInOut = (progress: number, factor: number) => progress <= 0.5
  ? linearIn(progress, factor)
  : linearOut(progress, factor)

const subProgress = (progress: number, from: number, to: number) => (progress - from) / (to - from)

const getMemberName = (uid: number) => {
  enum Member {
    "A-SOUL_Official" = 703007996, 
    "向晚大魔王" = 672346917,
    "贝拉kira" = 672353429,
    "珈乐Carol" = 351609538,
    "嘉然今天吃什么" = 672328094,
    "乃琳Queen" = 672342685
  };

  return Member[uid]
}

type ReportProps = {
  token: string
}

export const Report: FC<ReportProps> = ({ token }) => {
  const { VITE_APP_REPORT_DATA_URL } = import.meta.env
  const { data } = useSWR<ReportResponse>([VITE_APP_REPORT_DATA_URL, token])

  return (

    <div className="" >
      {data && <>
        <EffectSticky max={600}>
          <EffectStickyItem from={0} to={150}>
            {progress => <div className="h-full absolute inset-0 bg-cover  bg-default1" style={{ opacity: linearOut(progress, 0.2) }}/>}
          </EffectStickyItem>
          <EffectStickyItem from={125} to={250}>
            {progress => <div className="h-full absolute inset-0 bg-default2" style={{ opacity: linearInOut(progress, 0.2) }} /> }
          </EffectStickyItem>
          <EffectStickyItem from={225} to={350}>
            {progress => <div className="h-full absolute inset-0 bg-default3" style={{ opacity: linearInOut(progress, 0.2) }} /> }
          </EffectStickyItem>

          <EffectStickyItem from={0} to={50}>
            {progress => <div className="h-full absolute inset-0 flex flex-col justify-center items-center">
              <div style={{ opacity: linearOut(progress, 0.2), transform: `translateY(${-progress * 50}%)` }}>
                <p className="my-5 text-5xl text-white" >你好，{data.data.user.name}</p>
              </div>
            </div>}
          </EffectStickyItem>
          <EffectStickyItem from={50} to={100}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div style={{ opacity: linearInOut(progress, 0.2), transform: `translateY(${-progress * 50}%)` }}>
                <div className="my-5 text-2xl text-white" >从<span className="text-3xl">{unix(data.data.user.time).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了<span className="text-5xl">{dayjs().diff(unix(data.data.user.time), "d")}</span>天</div>
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
          <EffectStickyItem from={150} to={200}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative" style={{ bottom: progress * 64, opacity: linearInOut(progress, 0.2) }}>
                <div className="my-5 text-3xl text-fuchsia-700" >这一年，AU 们一起发送了</div>
                <div className="my-5 text-3xl text-fuchsia-700" ><span className="text-5xl">294万</span>条评论</div>
                <div className="my-5 text-3xl text-fuchsia-700" > <span className="text-5xl">2677万</span> 条弹幕</div>
              </div>
            </div>}
          </EffectStickyItem>

          <EffectStickyItem from={200} to={250}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative" style={{ bottom: progress * 64, opacity: linearInOut(progress, 0.2) }}>
                <div className="my-5 text-2xl text-fuchsia-700" >字数加起来相当于 <span className="text-5xl">800</span> 本西游记, </div>
                <Book
                  progress={progress}
                />
              </div>
            </div>}
          </EffectStickyItem>

          <EffectStickyItem from={250} to={300}>
            {progress => <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative" style={{ bottom: progress * 64, opacity: linearInOut(progress, 0.2) }}>
              <div className="my-5 text-3xl text-lime-100" >{unix(data.data.user.time).format("YYYY年M月D日")}，你第一次在{getMemberName(data.data.reply_first.uid)}</div>
                <div className="my-5 text-3xl text-lime-100" >的评论区发送回复，你说：</div>
                <div className="my-5 text-3xl text-lime-100 shadow-xl bg-sky-900 border-solid min-w-30 min-h-30 items-center justify-between flex rounded-lg border-2 relative" >
                  <Qoute
                    progress={progress}
                  />
                  <span>{data.data.reply_first.content}</span>
                  <div className="w-20"></div>
                </div>
                <div className="my-5 text-3xl text-lime-100" >这是历史性的一刻！当时的心情，你还记得么？</div>
              </div>
            </div>}
          </EffectStickyItem>

        </EffectSticky>
      </>}
    </div>
  )
}

{ /* <Slide id={1} containerRef={containerRef}>
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
        </Slide> */ }

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
export const isBetween = (value: number, from: number, to: number) => {
  return value >= from && value <= to
}
