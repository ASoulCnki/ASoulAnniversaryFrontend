import { StrictMode } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Report } from "~/views/Report"
import { Login } from "~/views/Login"
import { Redirect } from "./Redirect"

// const Welcome = lazy(() => import("./Login").then(module => ({ default: module.Welcome })))
// const Report = lazy(() => import("./report").then(module => ({ default: module.Report })))

import type { FC } from "react"

export const App: FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Report />} />
          <Route path="Login" element={<Login />} />
          <Route path="/redirect" element={<Redirect/>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}
