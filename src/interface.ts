export type Response<D> = {
  code: number
  message: string
  data: D
}

type User = {

  // 你好, { name }
  // 从  { 2020 年 12 年 1 日 } 开始，你已经陪伴 ASOUL 度过了 { 396 } 天
  // 感谢有你陪伴的每一天 

  name: string,
  time: number
}

type Total = {

  // 这一年，你在A-SOUL的{ dynamicNumber }条动态中留下了属于你的足迹~
  // 你在A-SOUL动态一共发送了{ sendNumber }条评论，在au中排第{ 116785 }位。

  dynamicNumber: number
  replyNumber: number
  rank: number
}

type Reply = {

  // { time }, 你第一次在A-SOUL评论区发送回复，你说:
  // { content }
  // 这是历史性的一刻！当时的心情，你还记得么？

  time: number
  uid: number
  content: string
}

type TotalLike = {
  // 这一年，你所有的评论共获赞{ likeNumber }次，在au中排前{ rank }%。

  likeNumber: number
  rank: number
}

type MaxLike = {

  // 偷偷地告诉你，你{ time }发布在{ uid }评论区的:
  // { content }

  // 包含被引用的，累计获得了{ likeNumber }个点赞,
  // 在au中取得了前{ rank }%的好成绩!

  likeNumber: number
} & Reply

type MaxUsed = {

  // 你{ time }发布在{ uid }评论区的:
  // { content }
  // 被偷了{ usedNumber }次,在au中取得了前{ rank }%的好成绩!

  usedNumber: number
} & Reply

type MaxSendOneDay = {

  // { date }，你狂发了{ sendNum }条评论，其中一条是
  // { content }
  // ，这一定是令你难忘的一天。

  date: string
  maxSendNumber: number
  content: string
}

type PreferTime = {

  // 你偏爱在 { time } 发言
  // 全年最 { 晚 } 发送评论的时刻定格于{ maxHour }

  time: "早晨" | "上午" | "下午" | "晚上"
  maxHour: number
}

export type ReportResponse = {
  code: number
  message: string
  data: {
    user: User
    reply_first: Reply
    reply_total: Total
    reply_total_like: TotalLike
    reply_max_like: MaxLike
    reply_max_used: MaxUsed
    reply_max_send_one_day: MaxSendOneDay
    reply_prefer_time: PreferTime
  }
}
