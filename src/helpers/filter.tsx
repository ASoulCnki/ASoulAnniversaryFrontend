import type { Data, UserData } from "~/interface"

export const getStartTime = (userData: UserData) => {
  let save: number[] = []
  Object.values(userData).forEach(ele => {
    if (typeof ele === "number" && ele !== 0) save.push(ele)
  })
  if (save.length !== 0) return Math.min(...save)
  return -1
}

export const getMemberName = (uid: number) => {
  enum Member {
    "A-SOUL_Official" = 703007996,
    "向晚大魔王" = 672346917,
    "贝拉kira" = 672353429,
    "珈乐Carol" = 351609538,
    "嘉然今天吃什么" = 672328094,
    "乃琳Queen" = 672342685,
  }

  return Member[uid]
}

export const getFansName = (uid: number) => {
  enum Member {
    "一个魂" = 703007996,
    "顶碗人" = 672346917,
    "贝极星" = 672353429,
    "皇珈骑士" = 351609538,
    "嘉心糖" = 672328094,
    "奶淇琳" = 672342685,
  }

  return Member[uid]
}

export const getPrefix = (time: string) => {
  if (time === "凌晨" || time === "上午") return "早"
  else return "晚"
}
