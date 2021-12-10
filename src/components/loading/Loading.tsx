import type { CSSProperties, FC } from "react"

const LOADING_SVG_URL = "/loading.svg"

const loadingStyles: CSSProperties = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const Loading: FC = () => {
  return (
    <div style={loadingStyles}>
      <img src={LOADING_SVG_URL} alt="loading" />
    </div>
  )
}
