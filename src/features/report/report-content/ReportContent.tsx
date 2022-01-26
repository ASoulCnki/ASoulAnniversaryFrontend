import { useRef } from "react"
import dayjs, { unix } from "dayjs"

import { Slider } from "~/components/slider"

import type { ReportResponse } from "~/interface"

import type { FC } from "react"

type ReportContentProps = {
  reportData: ReportResponse
}

export const ReportContent: FC<ReportContentProps> = ({ reportData }) => {
  const { data } = reportData

  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)

  return (
    <div className="h-full w-full">
      <Slider data={data}></Slider>
    </div>
  )
}
