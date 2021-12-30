import { useEffect, useState } from "react"
import { getTokenFromLocalStorage } from "~/helpers/token"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"

const { VITE_APP_REPORT_DATA_URL } = import.meta.env

export type ReportDataError = "NO_TOKEN" | "INVALID_TOKEN" | "SERVER_ERROR"

export const useReportData = (onError: (err: ReportDataError) => void) => {
  const [reportData, setReportData] = useState<ReportResponse | null>(null)

  const token = getTokenFromLocalStorage()

  useEffect(() => {
    if (token) {
      const method = "POST"
      const headers: ReportRequestHeaders = {
        "X-Au-Token": token,
      }
      window
        .fetch(VITE_APP_REPORT_DATA_URL, { method, headers })
        .then<ReportResponse>(res => res.json())
        .then(res => setReportData(res))
        .catch(err => {
          console.warn(err)
          onError("SERVER_ERROR")
        })
    } else {
      onError("NO_TOKEN")
    }
  }, [onError, token])
  return [reportData] as const
}
