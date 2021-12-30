import { StrictMode } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./home"
import { Login } from "../features/login"
import { Redirect } from "./redirect"
// const Welcome = lazy(() => import("./Login").then(module => ({ default: module.Welcome })))
// const Report = lazy(() => import("./report").then(module => ({ default: module.Report })))

import type { FC } from "react"
import { SWRConfig } from "swr"

const defaultFetcher = (url: string, token: string) =>
  fetch(url, { headers: { "X-Au-Token": token } }).then(res => res.json())

export const App: FC = () => {
  return (
    <StrictMode>
      <SWRConfig
        value={{
          fetcher: defaultFetcher,
          suspense: true,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="/redirect" element={<Redirect />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </StrictMode>
  )
}
