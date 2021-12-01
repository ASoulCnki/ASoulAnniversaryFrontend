import type { FC } from "react"
import type { ReportData } from "~/interface"
import dayjs, { unix } from "dayjs"
import useSWR from "swr"

type ReportProps = {
  token: string
}

export const Report: FC<ReportProps> = ({ token }) => {
  const { VITE_APP_REPORT_DATA_URL } = import.meta.env
  const { data } = useSWR<ReportData>([VITE_APP_REPORT_DATA_URL, token])
  if (!data) {
    return null
  }

  const { name, start_from } = data

  return (
    <div className="h-full flex flex-col justify-around items-center">
      <div className="p-4">
        <div className="my-5 text-3xl text-fuchsia-300 ">你好，{name}</div>
        <div className="my-5 text-2xl text-fuchsia-100">从<span className="text-3xl">{unix(start_from).format("YYYY年M月D日")}</span>开始，你已经陪伴A-SOUL走过了{dayjs().diff(unix(start_from), "d")}天</div>
      </div>
    </div>
  )
}
