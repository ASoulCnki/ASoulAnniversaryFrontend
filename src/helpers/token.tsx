import { useEffect } from "react"

const { VITE_APP_TOKEN_KEY } = import.meta.env

export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem(VITE_APP_TOKEN_KEY)
}

export const setTokenToLocalStorage = (token: string) => {
  window.localStorage.setItem(VITE_APP_TOKEN_KEY, token)
}

export const removeTokenFromLocalStorage = () => {
  window.localStorage.removeItem(VITE_APP_TOKEN_KEY)
}

type TokenMessage = {
  token: string
}
export const usePostTokenMessage = () => {
  useEffect(() => {
    const { hash } = window.location
    if (hash?.startsWith("#token=")) {
      const [, token] = hash.substring(1).split("=")
      setTokenToLocalStorage(token)
    }
  }, [])
}

export const useReceiveTokenMessage = (onSuccess: (token: string) => void) => {
  useEffect(() => {
    window.addEventListener("message", event => {
      const { token } = event.data as TokenMessage
      return token && onSuccess(token)
    })
  }, [onSuccess])
}
