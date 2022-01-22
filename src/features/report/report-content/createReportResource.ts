import { resolvePath } from "react-router-dom"
import { getTokenFromLocalStorage } from "~/helpers/token"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"
import { reportResponse } from "~/mocks/handlers/report"

export const wrapPromise = <T>(promise: Promise<T>) => {
  let status = "pending"
  let result: T | unknown
  const suspender = promise.then(
    r => {
      status = "success"
      result = r
    },
    e => {
      status = "error"
      result = e
    },
  )
  return {
    read() {
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result as T
      }
    },
  }
}

const { VITE_APP_REPORT_DATA_URL } = import.meta.env

export const createReportResource = () => {
  const token = getTokenFromLocalStorage() || ""
  const method = "POST"
  const headers: ReportRequestHeaders = {
    authorization: token,
  }
  return wrapPromise<ReportResponse>(
    fetch(VITE_APP_REPORT_DATA_URL, { method, headers }).then<ReportResponse>(
      res => res.json(),
    ),
  )
}

export const createReportResourceFake = (token: string) => {
  return wrapPromise<ReportResponse>(
    new Promise(resolve => {
      setTimeout(() => {
        resolve(reportResponse)
      }, 1000)
    }),
  )
}
