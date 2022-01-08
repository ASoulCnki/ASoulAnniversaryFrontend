import { useEffect, useState } from "react"
import { getTokenFromLocalStorage } from "~/helpers/token"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"
import useSWR, { SWRResponse } from "swr"

const { VITE_APP_REPORT_DATA_URL } = import.meta.env

export type ReportDataError = "NO_TOKEN" | "INVALID_TOKEN" | "SERVER_ERROR"

export const useReportData = (onError: (err: ReportDataError) => void) => {
  const token = getTokenFromLocalStorage()

  const fetcher = (url: string, token: string) =>
    fetch(url, {
      method: "POST",
      headers: { "X-Au-Token": token },
    }).then(res => res.json())

  const response: SWRResponse = useSWR<ReportResponse>(
    [VITE_APP_REPORT_DATA_URL, token],
    fetcher,
  )
  const reportData: ReportResponse = response.data as ReportResponse

  return [reportData] as const
}
