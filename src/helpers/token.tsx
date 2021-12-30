import { useEffect } from "react"

export const getTokenFromLocalStorage = () => {
  const { VITE_APP_TOKEN_KEY } = import.meta.env
  const token = window.localStorage.getItem(VITE_APP_TOKEN_KEY)
  return token
}

export const setTokenToLocalStorage = (token: string) => {
  const { VITE_APP_TOKEN_KEY } = import.meta.env
  window.localStorage.setItem(VITE_APP_TOKEN_KEY, token)
}

export const removeTokenFromLocalStorage = () => {
  const { VITE_APP_TOKEN_KEY } = import.meta.env
  window.localStorage.removeItem(VITE_APP_TOKEN_KEY)
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
      const { token } = event.data
      return token && onSuccess(token)
    })
  }, [onSuccess])
}
