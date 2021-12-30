import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ }) => {
  return {
    resolve: {
      alias: [
        { find: "~", replacement: "/src" }
      ]
    },
    plugins: [
      react()
    ],
    build: {
      target: "esnext"
    }
  }
})
