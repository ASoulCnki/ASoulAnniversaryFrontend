import { useRef } from "react"
import useSWR from "swr"
import dayjs, { unix } from "dayjs"

import { ProgressPlayer } from "~/components/progress-player/ProgressPlayer"

import type { ReportResponse } from "~/interface"

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

  return <div className=""></div>
}
