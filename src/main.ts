import { createElement } from "react"
import { render } from "react-dom"
import { App } from "./views/App"

import "virtual:windi.css"

render(createElement(App), document.getElementById("root"))
