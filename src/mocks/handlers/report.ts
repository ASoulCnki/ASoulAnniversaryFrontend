import { rest } from "msw"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"

export const reportRequestHeaders: ReportRequestHeaders = {
  "X-Au-Token": "daskjcnakjsndasa",
}

export const reportResponse: ReportResponse = {
  code: 0,
  message: "",
  data: {
    all: {
      replyCount: 123,
      danmuCount: 3123,
      dynamicCount: 123,
    },
    reply_first: {
      time: 1600000000,
      content: "你好，嘉然",
      uid: 0,
    },
    reply_total: {
      dynamicNumber: 0,
      replyNumber: 0,
      rank: 0,
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
      time: 0,
      content: "",
      uid: 0,
      likeNumber: 0,
      rank: 0,
    },
    reply_max_used: {
      time: 0,
      content: "",
      uid: 0,
      usedNumber: 0,
      rank: 0,
    },
    reply_max_send_one_day: {
      date: "",
      content: "",
      maxSendNumber: 0,
    },
    reply_prefer_time: {
      time: "",
      maxHour: 0,
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
