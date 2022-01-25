const typography = require("@tailwindcss/typography")
const clamp = require("@tailwindcss/line-clamp")

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
        ],
        "zcool": [
          "ZCOOL KuaiLe",
          "cursive",
          "-apple-system",
          "STSong",
          "SimSun"
        ]
      },
      backgroundImage: {
        default: "url(/backgrounds/background.png)",
        default1: "url(/backgrounds/background1.svg)",
        default2: "url(/backgrounds/background2.png)",
        default3: "url(/backgrounds/background3.png)",
        default4: "url(/backgrounds/background4.png)",
        default5: "url(/backgrounds/background5.svg)",
        default6: "url(/backgrounds/background6.png)",
        default7: "url(/backgrounds/background7.svg)",
        default8: "url(/backgrounds/background8.png)",
        default9: "url(/backgrounds/background9.png)",
        default10: "url(/backgrounds/background10.png)",
        default11: "url(/backgrounds/background11.png)",
        default12: "url(/backgrounds/background12.png)",
        result: "url(/backgrounds/background-result.svg)",
        arrow: "url(/arrow.svg)",
        "apple-text": "linear-gradient(75deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33.33%,  rgba(255,255,255,0) 66.67%, rgba(255,255,255,0) 100%)"
      },
      backgroundSize: {
        "size-apple-text": "300% 100%"
      },

      animation: {
        arrow: "arrow 2s ease-in-out infinite;"
      },
      keyframes: {
        arrow: {
          "0%": {
            transform: "translateY(40%)"
          },
          "50%": {
            transform: "translateY(0%)"
          },
          "to": {
            transform: "translateY(40%)"
          }
        }
      }
    }
  },
  plugins: [
    typography,
    clamp
  ]
}
