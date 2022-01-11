import { useNavigate } from "react-router-dom"

import { Loading } from "~/components/loading/Loading"
import { ReportContent } from "./report-content"

import type { FC } from "react"

import { useReportData } from "./useReportData"

export const Report: FC = () => {
  const navigate = useNavigate()

  const [reportData] = useReportData()

  // const handleLogout = () => {
  //   removeTokenFromLocalStorage()
  //   navigate("/login")
  // }

  return (
    <div className="">
      {reportData && <ReportContent reportData={reportData} />}
    </div>
  )
}
