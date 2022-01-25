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
    <div className="w-full h-full flex flex-col justify-center items-center relative bg-default bg-cover">
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
            <div className="text-sm sm:text-lg text-cyan-700 text-center bottom-5 left-0 w-full absolute flex justify-center items-center">
              <div className="w-1/2 text-center">
                年度报告使用的数据截止至2021年11月24日零点
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
