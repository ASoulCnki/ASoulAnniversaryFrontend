export type ReportRequestHeaders = {
  authorization: string
}

export type ReportResponse = {
  code: number
  message: string
  data: Data
}

export type Data = {
  user_data: UserData
  all: All
  reply_first: ReplyFirst
  reply_total: ReplyTotal
  danmu_total: DanmuTotal
  reply_total_like: ReplyTotalLike
  reply_max_like: ReplyMaxLike
  reply_max_used: ReplyMaxUsed
  reply_max_send_one_day: ReplyMaxSendOneDay
  reply_prefer_time: ReplyPreferTime
  medal: Medal[]
}

export type UserData = {
  "username": string
  "672346917": number
  "672353429": number
  "351609538": number
  "672328094": number
  "672342685": number
  "703007996": number
}

export type All = {
  replyCount: number
  danmuCount: number
  dynamicCount: number
}

export type ReplyFirst = {
  time: number
  content: string
  uid: number
}

export type ReplyTotal = {
  dynamicNumber: number
  replyNumber: number
  rank: number
}

export type DanmuTotal = {
  danmuNumber: number
  memberUid: number
  memberDanmuNumber: number
  giftNumber: number
  giftCost: number
  scNumber: number
  scCost: number
  rank: number
}

export type ReplyTotalLike = {
  likeNumber: number
  rank: number
}

export type ReplyMaxLike = {
  time: number
  content: string
  uid: number
  likeNumber: number
  rank: number
}

export type ReplyMaxUsed = {
  time: number
  content: string
  uid: number
  usedNumber: number
  rank: number
}

export type ReplyMaxSendOneDay = {
  date: string
  content: string
  maxSendNumber: number
}

export type ReplyPreferTime = {
  time: string
  maxHour: number
}

export type Medal = {
  name: string
  level: number
}
