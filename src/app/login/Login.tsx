// import { useNavigate } from "react-router-dom"

import type { FC } from "react"
import { useState } from "react"
import { Modal } from "~/components/Modal"
import { MdClose } from "react-icons/md"
import { Cover } from "./Cover"
import { UserAgreement } from "./UserAgreement"
import { OAuthIFrame } from "./OAuthIFrame"
import { setTokenToLocalStorage, useReceiveTokenMessage } from "~/helpers/token"
import { useNavigate } from "react-router-dom"

const getOauthLoginUrl = () => {
  const { VITE_APP_OAUTH_URL } = import.meta.env
  const { origin } = window.location
  const oauthRedirectUrl = encodeURIComponent(`${origin}/redirect`)
  const oauthLoginUrl = `${VITE_APP_OAUTH_URL}?redirect_uri=${oauthRedirectUrl}`
  return oauthLoginUrl
}

export const Login: FC = () => {

  const [isUserAgreementOpen, setIsUserAgreementOpen] = useState(false)
  const [isOAuthIFrameOpen, setIsOAuthIFrameOpen] = useState(false)

  const handleCoverPrimaryClick = () => setIsUserAgreementOpen(true)
  const handleUserAgreementAgree = () => {
    setIsUserAgreementOpen(false)
    setIsOAuthIFrameOpen(true)
  }
  const handleUserAgreementDisagree = () => setIsUserAgreementOpen(false)
  const handleUserAgreementClose = () => setIsUserAgreementOpen(false)
  const handleOAuthIFrameClose = () => setIsOAuthIFrameOpen(false)
  const iframeSrc = getOauthLoginUrl()

  const navigate = useNavigate()
  const handleOAuthSuccess = (token: string) => {
    setTokenToLocalStorage(token)
    navigate("/")
  }
  useReceiveTokenMessage(handleOAuthSuccess)
  return (
    <>
      <Cover onPrimaryClick={handleCoverPrimaryClick} />
      <Modal isOpen={isUserAgreementOpen} onClose={handleUserAgreementClose}>
        <div className="w-full h-full flex flex-col justify-center items-center" >
          <div className="w-11/12 h-11/12 max-w-screen-md max-h-screen-sm bg-white shadow-md rounded-xl">
            <UserAgreement onAgree={handleUserAgreementAgree} onDisagree={handleUserAgreementDisagree}/>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isOAuthIFrameOpen} onClose={handleOAuthIFrameClose}>
        <div className="w-full h-full flex flex-col justify-center items-center" >
          <div className="w-11/12 h-11/12 max-w-screen-md max-h-screen-sm overflow-hidden bg-white shadow-md rounded-xl" >
            <OAuthIFrame iframeSrc={iframeSrc}/>
          </div>
        </div>
      </Modal>
    </>
  )
}
