import { createElement } from "react"
import { render } from "react-dom"
import { App } from "./app"

import "virtual:windi.css"

render(createElement(App), document.getElementById("root"))
