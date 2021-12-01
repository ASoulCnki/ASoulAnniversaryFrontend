import type { FC } from "react"
import { usePostTokenMessage } from "~/helpers/token"

export const Redirect: FC = () => {
  usePostTokenMessage()
  return <p>完成...</p>
}
