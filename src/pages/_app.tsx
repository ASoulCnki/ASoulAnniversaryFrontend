import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./Home.page"
import { LoginPage } from "./Login.page"
import { RedirectPage } from "./Redirect.page"
// const Welcome = lazy(() => import("./Login").then(module => ({ default: module.Welcome })))
// const Report = lazy(() => import("./report").then(module => ({ default: module.Report })))

import type { FC } from "react"

// const defaultFetcher = (url: string, token: string) => fetch(url, { headers: { "X-Au-Token": token } })
//   .then(res => res.json())

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  )
}
