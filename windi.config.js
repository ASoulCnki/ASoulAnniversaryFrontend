import { defineConfig } from "windicss/helpers"
import typography from "windicss/plugin/typography"

export default defineConfig({
  extract: {
    include: ["src/**/*.tsx", "index.html"]
  },
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
        ]
      },
      backgroundImage: {
        default: "url(/background.svg)"
      }
    }
  },

  plugins: [
    typography
  ]
})
// backgroundImage: (theme) => {
//   'hero-lg': "url('/storage/img/sys/lg-hero.jpg')",
//   'hero-sm': "url('/storage/img/sys/sm-hero.jpg')",
// },
