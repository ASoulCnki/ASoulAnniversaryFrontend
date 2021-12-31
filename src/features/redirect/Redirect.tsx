import { usePostTokenMessage } from "~/helpers/token"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import type { FC } from "react"

export const Redirect: FC = () => {
  const navigate = useNavigate()
  usePostTokenMessage()
  useEffect(() => {
    navigate("/")
  }, []);

  return <p>完成...</p>
}
