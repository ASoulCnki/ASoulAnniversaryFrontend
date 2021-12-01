import type { FC } from "react"

type CoverProps = {
  onPrimaryClick: () => void
  // onAgreementClick: () => void
  // onAgreementToggle: () => void
  // agree: boolean
}

export const Cover: FC<CoverProps> = ({ onPrimaryClick }) => {
  const title = "我的2021"
  const subTitle = "ASOUL 年度数据报告"
  const primaryName = "开启报告"
  // const userAgreementLabel = "我已阅读并同意《用户协议》"
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative bg-default bg-cover">
      <div className="w-full h-full max-w-screen-md max-h-screen-lg">
        <div className="h-full flex flex-col justify-around items-center">
          <div className="p-4">
            <div className="my-5 text-4xl text-fuchsia-300 ">{title}</div>
            <div className="my-5 text-3xl text-fuchsia-100">{subTitle}</div>
          </div>
          <div className="p-4">
            <button
              className="w-36 py-2 px-4 text-center bg-fuchsia-700 text-fuchsia-100 rounded-full border border-fuchsia-700 focus:outline-none"
              onClick={onPrimaryClick}
              onKeyDown={onPrimaryClick}
            >
              {primaryName}
            </button>
            {/* <div className="flex items-center ">
              <input
                className="h-4 w-4 border border-gray-300 rounded-md bg-blue-600 border-transparent focus:outline-none"
                type="checkbox"
                id="user-agreement"
                checked={agree}
                onClick={onAgreementToggle}
                onKeyDown={onAgreementToggle}
              />
              <label className="text-fuchsia-300 text-sm" onClick={onAgreementClick} onKeyDown={onAgreementClick} htmlFor="user-agreement">
                <span className="" >{userAgreementLabel}</span>
              </label>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
