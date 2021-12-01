import { Suspense, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import type { FC } from "react"
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "~/helpers/token"
import { Loading } from "~/components/Loading"
import { Report } from "./Report"

const BACKGROUND_URL = "/background_1.svg"

const useCheckToken = (token: string | null, onMissing: () => void) => {
  useEffect(() => {
    if (!token) {
      onMissing()
    }
  })
}
export const Home: FC = () => {

  const navigate = useNavigate()
  const token = getTokenFromLocalStorage()

  useCheckToken(token, () => navigate("/login"))

  const handleLogout = () => {
    removeTokenFromLocalStorage()
    navigate("/login")
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative bg-default bg-cover">
      <div className="p-4 float-right text-white" onClick={handleLogout}>注 销</div>
      <ErrorBoundary fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          {token && <Report token={token}/>}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
