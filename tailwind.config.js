const typography = require("@tailwindcss/typography")
const clamp = require('@tailwindcss/line-clamp')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Liberation Sans",
          "PingFang SC",
          "Hiragino Sans GB",
          "Noto Sans CJK SC",
          "Source Han Sans SC",
          "Source Han Sans CN",
          "Microsoft YaHei",
          "Wenquanyi Micro Hei",
          "WenQuanYi Zen Hei",
          "ST Heiti",
          "SimHei",
          "WenQuanYi Zen Hei Sharp",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
          "sans-serif"
        ],
        'source-han-serif': [
          "source-han-serif-sc",
          "serif"
        ]
      },
      backgroundImage: {
        default: "url(/background.svg)",
        default1: "url(/background1.svg)",
        default2: "url(/background2.svg)",
        default3: "url(/background3.svg)",
        default4: "url(/background4.svg)",
        default5: "url(/background5.svg)",
        default6: "url(/background6.svg)",
        default7: "url(/background7.svg)",
        "apple-text": "linear-gradient(75deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33.33%,  rgba(255,255,255,0) 66.67%, rgba(255,255,255,0) 100%)"
      },
      backgroundSize: {
        "size-apple-text": "300% 100%"
      }
    }
  },
  plugins: [
    typography,
    clamp
  ]
}
