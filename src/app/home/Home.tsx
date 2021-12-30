import { Suspense, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "~/helpers/token"
import { Loading } from "~/components/loading/Loading"
import { Report } from "./Report"

import type { FC } from "react"

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

  // const handleLogout = () => {
  //   removeTokenFromLocalStorage()
  //   navigate("/login")
  // }

  return (
    <div className="">
      {/* <div className="p-4  float-right text-white" onClick={handleLogout}>注 销</div> */}
      <ErrorBoundary fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          {token && <Report token={token}/>}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
