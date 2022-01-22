import { rest } from "msw"
import type { ReportRequestHeaders, ReportResponse } from "~/interface"

export const reportRequestHeaders: ReportRequestHeaders = {
  authorization: "daskjcnakjsndasa",
}

export const reportResponse: ReportResponse = {
  code: 0,
  message: "",
  data: {
    user_data: {
      "username": "一般路过一个魂",
      "672346917": 1615120200,
      "672353429": 1615120200,
      "351609538": 1615120200,
      "672328094": 1615120200,
      "672342685": 1615120200,
      "703007996": 1615120200,
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
      danmuNumber: 102,
      memberUid: 672328094,
      memberDanmuNumber: 56,
      giftNumber: 202,
      giftCost: 296.0,
      scNumber: 1,
      scCost: 1,
      rank: 0.19953,
    },
    reply_total_like: {
      likeNumber: 53,
      rank: 0.024351,
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
      date: "2021-12-01",
      content: "以后国V第一",
      maxSendNumber: 314,
    },
    reply_prefer_time: {
      time: "晚上",
      maxHour: 3,
    },
    medal: [
      {
        name: "铁血乃淇琳",
        level: 6,
      },
      {
        name: "爱在黄昏日落时",
        level: 6,
      },
      {
        name: "滔滔不绝",
        level: 3,
      },
      {
        name: "才高八斗",
        level: 2,
      },
      {
        name: "枝江学阀",
        level: 2,
      },
      {
        name: "爱意绵绵",
        level: 2,
      },
    ],
  },
}

export const reportHandler = rest.post("/mock/api/report", (req, res, ctx) => {
  if (req.headers.get("X-Au-Token") === "daskjcnakjsndasa") {
    return res(ctx.status(200), ctx.json(reportResponse))
  } else {
    return res(ctx.status(401))
  }
})
