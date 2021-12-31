// export type StrategyFunc = (progress: number, from) => number

import { To } from "react-router-dom"

// const bezierThreeStage = BezierEasing(0, .42, 1, .58)
// const bezierEaseOut = BezierEasing(0, .8, .5, 1)

// const linear: StrategyFunc = progress => {
//   return progress
// }

// const curve: StrategyFunc = progress => {
//   return bezierThreeStage(progress)
// }

// const curveOnEnter: StrategyFunc = progress => {
//   if (progress <= 0) {
//     return 0
//   }
//   if (progress <= 0.2) {
//     return bezierEaseOut(progress * 5)
//   }
//   return 1
// }

// const curveOnLeave: StrategyFunc = progress => {
//   if (progress <= 0.8) {
//     return 1
//   }
//   if (progress <= 1) {
//     return bezierEaseOut((1 - progress) * 5)
//   }
//   return 0
// }

// const curveOnEnterAndLeave: StrategyFunc = progress => {
//   if (progress <= 0) {
//     return 0
//   }
//   if (progress <= 0.2) {
//     return bezierEaseOut(progress * 5)
//   }
//   if (progress <= 0.8) {
//     return 1
//   }
//   if (progress <= 1) {
//     return bezierEaseOut((1 - progress) * 5)
//   }
//   return 0
// }

// export const Strategies = {
//   linear, curve, curveOnEnter, curveOnLeave, curveOnEnterAndLeave
// }

// export const createRatio = (progress: number, from: number, to: number, strategy: StrategyFunc) => {
//   const _progress = progress <= from
//     ? from
//     : progress <= to
//       ? progress
//       : to
//   return strategy((_progress - from) / (to - from))
// }

export const isBetween = (value: number, from: number, to: number) => {
  return value >= from && value <= to
}

export const makeRatioLinear = (progress: number, from: number, to: number) => {
  if (progress <= from) {
    return 0
  }
  if (progress <= to) {
    return (progress - from) / (to - from)
  }
  return 1
}

export const makeRatioEnter = (progress: number, from: number, to: number, pct: number) => {
  if (progress <= from) {
    return 0
  }
  if (progress <= from + (to - from) * pct) {
    return (progress - from) / ((to - from) * pct)
  }
  return 1
}

export const makeRatioLeave = (progress: number, from: number, to: number, pct: number) => {
  if (progress <= to - (to - from) * pct) {
    return 1
  }
  if (progress <= to) {
    return (to - progress) / ((to - from) * pct)
  }
  return 0
}

export const makeRatioEnterAndLeave = (progress: number, from: number, to: number, pct: number) => {
  if (progress <= from) {
    return 1
  }
  if (progress <= from + (to - from) * pct) {
    return (progress - from) / ((to - from) * pct)
  }
  if (progress <= to - (to - from) * pct) {
    return 1
  }
  if (progress <= to) {
    return (to - progress) / ((to - from) * pct)
  }
  return 0
}

 type Strategy = ({
   lt: number
 } | {
   lte: number
 } | {
   gt: number
 } | {
   gte: number
 }) & {
   func: (progress: number) => number
 }

export const makeRatio = (progress: number, from: number, to: number) => ({
  _value: 1,
  _strategies: [] as Strategy[]
})
