import { createRoot } from "react-dom"
import { App } from "./app"

import "virtual:windi.css"

const container = document.getElementById("react-app") as HTMLDivElement

const root = createRoot(container)

root.render(<App/>)
