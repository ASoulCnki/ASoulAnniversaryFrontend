import type { FC } from "react"

type WraperProps = {
  background: string
}

export const Content: FC = ({ children }) => {
  return (
    <div className="relative duration-500 px-8 h-screen w-screen flex justify-center items-center flex-col">
      <div className="max-w-2xl">{children}</div>
    </div>
  )
}

export const Wraper: FC<WraperProps> = ({ background }) => {
  return <div className={`${background} fill absolute w-full h-full`}></div>
}
