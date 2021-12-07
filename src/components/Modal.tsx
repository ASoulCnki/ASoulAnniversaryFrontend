import type { CSSProperties, FC } from "react"
import { useRef } from "react"
import { Transition } from "react-transition-group"
import Div100vh from "react-div-100vh"

const wrapperStyles: CSSProperties = {
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0
}

const wrapperTransitionStyles: Record<string, CSSProperties> = {
  entering: { visibility: "visible" },
  entered: { visibility: "visible" },
  exiting: { visibility: "visible" },
  exited: { visibility: "hidden" }
}

type WrapperTransitionStatus = keyof (typeof wrapperTransitionStyles)

const backgroundStyles: CSSProperties = {
  height: window.innerHeight,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, .3)",
  transition: "opacity 400ms cubic-bezier(0.165, 0.840, 0.440, 1.000)"

}

const backgroundTransitionStyles: Record<string, CSSProperties> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

type BackgroundTransitionStatus = keyof (typeof backgroundTransitionStyles)

const modalStyles: CSSProperties = {
  height: "100%",
  width: "100%",
  transition: "transform 400ms cubic-bezier(0.165, 0.840, 0.440, 1.000)"
}

const modalTransitionStyles: Record<string, CSSProperties> = {
  entering: { transform: "translateY(0%)" },
  entered: { transform: "translateY(0%)" },
  exiting: { transform: "translateY(-50%)" },
  exited: { transform: "translateY(50%)" }
}

type ModalTransitionStatus = keyof (typeof modalTransitionStyles)

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const refWrapper = useRef(null)
  const refBackground = useRef(null)
  const refModal = useRef(null)
  return (
    <Transition in={isOpen} timeout={400} nodeRef={refWrapper}>
      {(state: WrapperTransitionStatus) => <div ref={refWrapper} style={{ ...wrapperStyles, ...wrapperTransitionStyles[state] }} >
        <Transition in={isOpen} timeout={400} nodeRef={refBackground}>
          {(state: BackgroundTransitionStatus) => <div ref={refBackground} style={{ ...backgroundStyles, ...backgroundTransitionStyles[state] }}>
            <Transition in={isOpen} timeout={400} nodeRef={refModal}>
              {(state: ModalTransitionStatus) => <div ref={refModal} style={{ ...modalStyles, ...modalTransitionStyles[state] }}>
                {children}
              </div>}
            </Transition>
          </div>}
        </Transition>
      </div>}
    </Transition>
  )
}

// export const Modal: FC<ModalProps> = ({ children, isOpen, onClose, title, primary, secondary }) => {

//   // const transitions = useTransition(isOpen, {
//   //   from: { transform: "scale(0.5)" },
//   //   enter: { transform: "scale(1)" },
//   //   leave: { transform: "scale(0.5)" },
//   //   reverse: isOpen,
//   //   delay: 0,
//   //   config: {
//   //     duration: 400,
//   //     tension: 210,
//   //     friction: 20
//   //   }
//   // config: config.molasses,
//   // onRest: () => set(!show)
//   // })
//   return <div className="w-screen h-screen fixed inset-0 flex justify-center items-center border invisible">
//     { isOpen && <div className="w-10/12 h-8/12 bg-white visible animate-animated animate-fadeIn  animate-faster">
//       <div className="w-full h-full flex flex-col items-center">
//         <div className="h-20 ">
//           {title}
//         </div>
//         <div className="overflow-y-scroll">
//           {children}
//         </div>
//         {primary && <button
//           className="w-36 py-2 px-4 bg-gray-600 text-center text-fuchsia-200 rounded-full"
//           onClick={primary.action}
//           onKeyDown={primary.action}
//         >{primary.name}</button>}
//         {secondary && <button
//           className="w-36 py-2 px-4 bg-fuchsia-00 text-center text-fuchsia-200 rounded-full"
//           onClick={secondary.action}
//           onKeyDown={secondary.action}
//         >{secondary.name}</button>}
//       </div>
//     </div>}
//   </div>
// }

// type ResponsiveContainerProps = {
//   style?: CSSProperties
// }
// export const ResponsiveContainer: FC<ResponsiveContainerProps> = ({ children, style }) => {
//   return (
//     <div
//       style={style}
//       className="w-screen h-screen flex flex-col justify-center items-center relative bg-cover"
//     >
//       <div className="w-full h-full max-w-md max-h-md">
//         {children}
//       </div>
//     </div>
//   )
// }
