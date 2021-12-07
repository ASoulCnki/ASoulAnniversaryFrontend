import type { FC } from "react"
import { useRef, useState, useEffect } from "react"

import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player"

type HTMLPLayerElement = HTMLElement & {
  setSeeker: (value: number | string) => void
}

type ProgressPlayerProps = {
  progress: number
}

export const ProgressPlayer: FC<ProgressPlayerProps> = ({ progress }) => {
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<Player>(null)
  useEffect(() => {
    if (true) {
      playerRef.current?.setSeeker(Math.round(progress * 100), false)
    }
  }, [isReady, progress])
  return <Player
    ref={playerRef}
    onEvent={event => {
      if (event === PlayerEvent.Ready) {
        setIsReady(true)
      }
    }}
    src="/book-lottie.json"
    style={{ height: "300px", width: "300px" }}
  />
}
