// <a href="/redirect#token=daskjcnakjsndasa" class="">
// 身份1
// </a>

import { rest } from "msw"

type ID = {
  name: string
  token: string
}

const ids: ID[] = [
  {
    name: "身份一",
    token: "daskjcnakjsndasa",
  },
]

const createOAuthPage = (ids: ID[], redirectUrl: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Oauth</title>
    </head>
    <body>
        <p>告诉我们你的B站ID</p>
        <p>
          <a href="/redirect#token=daskjcnakjsndasa" class="">
            身份1
          </a>
          ${ids
            .map(
              ({ name, token }) => `
                <a href="${redirectUrl}#token=${token}" class="">
                  ${name}
                </a>
              `,
            )
            .join("")}
        </p>
    </body>
    </html>
  `
}

export const oauthPageHandler = rest.get(
  "/mock/oauth-page*",
  (req, res, ctx) => {
    const redirectUrl = req.url.searchParams.get("redirect_url") || "/redirect"
    return res(ctx.status(200), ctx.text(createOAuthPage(ids, redirectUrl)))
  },
)
