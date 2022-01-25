import type { FC } from "react"

type WraperProps = {
  background: string
}

export const Content: FC = ({ children }) => {
  return (
    <div className="slide-centent duration-500 px-8 w-full h-full flex justify-center items-center flex-col">
      <div className="max-w-[80vw] flex justify-center items-center flex-col h-full">
        {children}
      </div>
    </div>
  )
}

export const Wraper: FC<WraperProps> = ({ background }) => {
  return <div className={`${background} fill absolute w-full h-full`}></div>
}
