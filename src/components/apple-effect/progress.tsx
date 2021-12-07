export {}

// const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

// export type Progress = {
//   value: () => number
//   subProgress: (from: number, to: number) => Progress
//   isBetween: (from: number, to: number) => boolean
//   ratio: (from: number, to: number) => number
// }

// export type ProgressFactory = (_value: number, from: number, to: number) => Progress

// export const createProgress: ProgressFactory = (_value, from, to): Progress => {

//   const value = () => _value

//   const isBetween = (from: number, to: number) => _value >= from && _value <= to

//   const ratio = (from: number, to: number) => (_value - from) / (to - from)

//   return {
//     value,
//     subProgress,
//     isBetween,
//     ratio
//   }
// }
