import { useEffect } from "react"
import { useLocalStorage } from "react-use"
import { useNavigate } from "react-router-dom"

import type { FC } from "react"
import type { ReportData } from "~/interface"

const BACKGROUND_URL = "/background_1.svg"

// const useOAuthToken = () => {
//   const [name, value] = window.location.hash
//   useEffect(() => {
//     if (name === "token" && value) {
//       window.localStorage.setItem("oauth-token", value)
//     }
//   }, [name, value])
// }

const useCheckReportData = (data: ReportData | undefined) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!data) {
      navigate("/login")
    }
  }, [data, navigate])
}

export const Report: FC = () => {
  const [reportData, setReportData, removeReportData] = useLocalStorage<ReportData>("report-data", undefined)
  useCheckReportData(reportData)
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center relative bg-cover"
      style={{ backgroundImage: `url(${BACKGROUND_URL})` }}
    >
      <div className="">这一年……</div>
      <div>2021</div>
    </div>
  )
}
