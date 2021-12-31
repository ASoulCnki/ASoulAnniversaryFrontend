import { useState, useEffect } from "react"
import { setTokenToLocalStorage, useReceiveTokenMessage } from "~/helpers/token"
import { Modal } from "~/components/modal/Modal"
import { Cover } from "./Cover"
import { UserAgreement } from "./UserAgreement"

import type { FC } from "react"

const { VITE_APP_OAUTH_URL } = import.meta.env

const getOauthLoginUrl = () => {
  const { origin } = window.location
  const oauthRedirectUrl = encodeURIComponent(`${origin}/redirect`)
  const oauthLoginUrl = `${VITE_APP_OAUTH_URL}?redirect_uri=${oauthRedirectUrl}`
  return oauthLoginUrl
}

export const Login: FC = () => {
  const [isUserAgreementOpen, setIsUserAgreementOpen] = useState(false)

  const handleCoverPrimaryClick = () => setIsUserAgreementOpen(true)
  const handleUserAgreementAgree = () => {
    setIsUserAgreementOpen(false)
    window.location.assign(getOauthLoginUrl());
  }
  const handleUserAgreementDisagree = () => setIsUserAgreementOpen(false)
  const handleUserAgreementClose = () => setIsUserAgreementOpen(false)

  return (
    <>
      <Cover onPrimaryClick={handleCoverPrimaryClick} />
      <Modal isOpen={isUserAgreementOpen} onClose={handleUserAgreementClose}>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-11/12 h-5/6 max-w-[48rem] max-h-[40rem] bg-white shadow-md rounded-xl">
            <UserAgreement
              onAgree={handleUserAgreementAgree}
              onDisagree={handleUserAgreementDisagree}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
