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
        serif: [
          "ui-serif",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif"
        ],
        "noto-serif-sc": [
          "Noto Serif SC",
          "serif",
          "-apple-system",
          "STSong",
          "SimSun"
        ]
      },
      backgroundImage: {
        default: "url(/backgrounds/background.svg)",
        default1: "url(/backgrounds/background1.svg)",
        default2: "url(/backgrounds/background2.svg)",
        default3: "url(/backgrounds/background3.svg)",
        default4: "url(/backgrounds/background4.svg)",
        default5: "url(/backgrounds/background5.svg)",
        default6: "url(/backgrounds/background6.svg)",
        default7: "url(/backgrounds/background7.svg)",
        default8: "url(/backgrounds/background8.svg)",
        default9: "url(/backgrounds/background9.svg)",
        default10: "url(/backgrounds/background10.svg)",
        default11: "url(/backgrounds/background11.svg)",
        default12: "url(/backgrounds/background12.svg)",
        "apple-text": "linear-gradient(75deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33.33%,  rgba(255,255,255,0) 66.67%, rgba(255,255,255,0) 100%)"
      },
      backgroundSize: {
        "size-apple-text": "300% 100%"
      },
      gridTemplateRows: {
        'two': 'repeat(auto-fill, 48%)',
        'three': 'repeat(auto-fill, 30%)'
      }
    }
  },
  plugins: [
    typography,
    clamp
  ]
}
