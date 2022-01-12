import { useEffect, useState } from "react"
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "~/helpers/token"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"
import useSWR, { SWRResponse } from "swr"
import { useNavigate } from "react-router-dom"

const { VITE_APP_REPORT_DATA_URL } = import.meta.env

export const useReportData = () => {
  const token = getTokenFromLocalStorage()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  })
  const fetcher = (url: string, token: string) =>
    fetch(url, {
      method: "POST",
      headers: { "X-Au-Token": token },
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
        removeTokenFromLocalStorage()
        navigate("/login")
      })

  const response: SWRResponse = useSWR<ReportResponse>(
    [VITE_APP_REPORT_DATA_URL, token],
    fetcher,
  )
  const reportData: ReportResponse = response.data as ReportResponse

  return [reportData] as const
}
