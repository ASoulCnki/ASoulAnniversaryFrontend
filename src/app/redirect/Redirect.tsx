import { usePostTokenMessage } from "~/helpers/token"

import type { FC } from "react"

export const Redirect: FC = () => {
  usePostTokenMessage()
  return <p>完成...</p>
}
