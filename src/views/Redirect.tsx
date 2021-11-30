import { useEffect } from "react"
import type { FC } from "react"

export const Redirect: FC = () => {
  useEffect(() => {
    const { hash } = window.location
    window.parent.postMessage({ hash }, "*")
  })
  return null
}
