import type { FC } from "react"

type OAuthIFrameProps = {
  iframeSrc: string
  // onClose: () => void
}

export const OAuthIFrame: FC<OAuthIFrameProps> = ({ iframeSrc }) => {
  return (
    <div className="w-full h-full flex flex-col items-center divide-y-2 overflow-hidden">
      <div className="w-full flex justify-between items-center">
        <h2 className="p-4 font-bold">{"OAuth"}</h2>
        {/* <button className="w-14 h-14 flex justify-center items-center focus:outline-none" onClick={onClose} onKeyDown={onClose}><MdClose size={24}/></button> */}
      </div>
      <iframe title="ss" className="w-full h-full overflow-y-scroll" src={iframeSrc} frameBorder={0} />
    </div>
  )
}
