import { useNavigate } from "react-router-dom"

import { Loading } from "~/components/loading/Loading"
import { ReportContent } from "./report-content"

import type { FC } from "react"
import type { ReportDataError } from "./useReportData"
import { useReportData } from "./useReportData"

export const Report: FC = () => {
  const navigate = useNavigate()

  const handleFetchError = (err: ReportDataError) => {
    // todo: handle errors
    switch (err) {
      case "NO_TOKEN":
        break
      case "INVALID_TOKEN":
        break
      case "SERVER_ERROR":
        break
    }
    navigate("/login")
  }

  const [reportData] = useReportData(handleFetchError)

  // const handleLogout = () => {
  //   removeTokenFromLocalStorage()
  //   navigate("/login")
  // }

  return (
    <div className="">
      {/* <div className="p-4  float-right text-white" onClick={handleLogout}>注 销</div> */}
      {reportData && <ReportContent reportData={reportData} />}
    </div>
  )
}
