import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import windiCSS from "vite-plugin-windicss"
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const { VITE_APP_USE_PREACT } = loadEnv(mode, process.cwd())
  const preactAlias = VITE_APP_USE_PREACT === "true"
    ? [
      { find: "react", replacement: "preact/compat" },
      { find: "react-dom", replacement: "preact/compat" },
      { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" }
    ]
    : []
  return {
    resolve: {
      alias: [
        { find: "~", replacement: "/src" },
        ...preactAlias
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
