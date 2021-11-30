export type Response<D> = {
  code: number
  message: string
  data: D
}

type reportResponseData = {
  total: Total
  first_send: Reply
  max_like: MaxLike
  max_used: MaxUsed
  stolen: Stolen
  max_send_one_day: MaxSendOneDay
  text: TextNum
}

type Total = {

  // 这一年，你在A-SOUL的{ dynamicNumber }条动态中留下了属于你的足迹~
  // 你在A-SOUL动态一共发送了{ sendNumber }条评论，在au中排第{ 116785 }位。

  // 发送最多的是{ maxDynamicOwner }的评论区，共计{ maxSingleOwnerNumber }条，
  // 在au中排第{ maxOwnerRank }位，你的巅峰以Ta命名！

  dynamicNumber: number
  sendNumber: number
  rank: number
  maxDynamicOwner: string
  maxSendNumber: number
  maxOwnerRank: number
}

type TextNum = {

  // 你今年在A-SOUL评论区总计发送了{ length }个字的评论，
  // 相当于一本 { book }!

  length: number
  book: "莎士比亚全集"
}

type Reply = {

  // { time }, 你第一次在A-SOUL评论区发送回复, 你说:
  // { content }
  // 这是历史性的一刻！当时的心情，你还记得么？

  time: number
  dynamicOwner: string
  rank: number
  content: string
}

type MaxLike = {

  // 偷偷地告诉你，你{ time }发布在{ dynamicOwner }评论区的:
  // { content }

  // 包含被引用的，累计获得了{ likeNum }个点赞,
  // 在au中取得了前{ rank }%的好成绩!

  likeNum: number
} & Reply

type MaxUsed = {

  // 你{ time }发布在{ dynamicOwner }评论区的:
  // { content }
  // 被引用了{ usedNum }次,在au中取得了前{ rank }%的好成绩!

  usedNum: number
} & Reply

type Stolen = {

  // 你偷的小作文:
  // { content }
  // 有{ stolenNum }个au和你一起偷了。
  // 稀罕的不是碰巧相遇，而是你热爱的我也恰巧喜欢。

  stolenNum: number
} & Reply

type MaxSendOneDay = {

  // 你偏爱在[{ timeRange }]发言,
  // 全年最[早|晚]发送评论的时刻定格于{ time },
  // 其实你不是一个人，有{ percent }%的au也喜欢在这个时候发送评论。
  // { time }，你狂发了{ sendNum }条评论，其中一条是
  // { content }
  // ，这一定是令你难忘的一天。

  percent: number
  maxSendTime: number
  timeRange: "早晨" | "上午" | "下午" | "晚上"
  sendNum: number
} & Reply

type ReportResponse = {
  code: number
  message: string
  data: {
    total: Total
    first_send: Reply
    max_like: MaxLike
    max_used: MaxUsed
    stolen: Stolen
    max_send_one_day: MaxSendOneDay
    text: TextNum
  }
}

export type ReportData = {
  uid: number
  name: string
  start_from: number
}
