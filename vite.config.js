import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import windiCSS from "vite-plugin-windicss"

export default defineConfig(({ }) => {
  return {
    resolve: {
      alias: [
        { find: "~", replacement: "/src" }
      ]
    },
    plugins: [
      react(),
      windiCSS()
    ],
    build: {
      target: "esnext"
    }
  }
})
