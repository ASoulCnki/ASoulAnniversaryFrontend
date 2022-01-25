import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import visualizer from "rollup-plugin-visualizer";

const version = process.env.npm_package_version
process.env.VITE_APP_VERSION = JSON.stringify(version).replace(/(^"|"$)/g, "")

export default defineConfig(({}) => {
  return {
    resolve: {
      alias: [{ find: "~", replacement: "/src" }],
    },
    plugins: [react(),visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        })],
    build: {
      target: "esnext",
    },
  }
})
