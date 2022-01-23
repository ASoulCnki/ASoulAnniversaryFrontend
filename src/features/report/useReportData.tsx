import { useEffect, useState } from "react"
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "~/helpers/token"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"
import useSWR, { SWRResponse } from "swr"
import { useNavigate } from "react-router-dom"
import { reportResponse } from "~/mocks/handlers/report"

const { VITE_APP_REPORT_DATA_URL } = import.meta.env

export const useReportData = () => {
  const token = getTokenFromLocalStorage()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  })
  const fetcher = async (url: string, token: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { authorization: token },
    })

    const data = await res.json()
    if (data.code !== 0) {
      console.log(data.message)
      removeTokenFromLocalStorage()
      navigate("/login")
    }
    return data
  }

  const response: SWRResponse = useSWR<ReportResponse>(
    [VITE_APP_REPORT_DATA_URL, token],
    fetcher,
  )
  const reportData: ReportResponse = response.data as ReportResponse

  return [reportData] as const
}
