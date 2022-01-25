import { createRoot } from "react-dom"
import { App } from "~/pages/_app"

import "./index.css"

const { VITE_APP_VERSION, MODE } = import.meta.env

const startApp = () => {
  const container = document.getElementById("react-app") as HTMLDivElement
  const root = createRoot(container)

  root.render(<App />)
}

const main = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const { worker } = await import("~/mocks/browser")
      await worker.start({
        serviceWorker: { url: "/mockServiceWorker.js" },
        onUnhandledRequest: "bypass",
      })
    } catch (err) {
      console.error(err)
    }
  }
  startApp()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
