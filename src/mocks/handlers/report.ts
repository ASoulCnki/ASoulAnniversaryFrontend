import { rest } from "msw"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"

export const reportRequestHeaders: ReportRequestHeaders = {
  "X-Au-Token": "daskjcnakjsndasa",
}

export const reportResponse: ReportResponse = {
  code: 0,
  message: "",
  data: {
    user_info: {
      username: "普通的一个魂",
      startTime: 1609459200,
    },
    all: {
      replyCount: 294,
      danmuCount: 2677,
      dynamicCount: 123,
    },
    reply_first: {
      time: 1609459200,
      content:
        "然然，我今天发工资了，发了1300。你肯定觉得我会借14块钱，然后给你打个1314块的sc对不对？不是哦，我一块都不打给你，我要留着自己吃饭[给心心][给心心]",
      uid: 672328094,
    },
    reply_total: {
      dynamicNumber: 52,
      replyNumber: 171,
      rank: 0.87457,
    },
    danmu_total: {
      danmuNumber: 0,
      memberUid: 0,
      memberDanmuNumber: 0,
      giftNumber: 0,
      giftCost: 0,
      scNumber: 0,
      scCost: 0,
      rank: 0,
    },
    reply_total_like: {
      likeNumber: 0,
      rank: 0,
    },
    reply_max_like: {
      time: 1609459200,
      content: "你好，嘉然",
      uid: 672328094,
      likeNumber: 0,
      rank: 0,
    },
    reply_max_used: {
      time: 1609459200,
      content: "你好，嘉然",
      uid: 672328094,
      usedNumber: 109,
      rank: 0.1353453,
    },
    reply_max_send_one_day: {
      date: "",
      content: "",
      maxSendNumber: 0,
    },
    reply_prefer_time: {
      time: "晚上",
      maxHour: 3,
    },
    medal: [],
  },
}

export const reportHandler = rest.post("/mock/api/report", (req, res, ctx) => {
  if (req.headers.get("X-Au-Token") === "daskjcnakjsndasa") {
    return res(ctx.status(200), ctx.json(reportResponse))
  } else {
    return res(ctx.status(401))
  }
})
