import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [
    nodePolyfills(),
    react(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  optimizeDeps: {
    include: ["immer"],
    needsInterop: ["@accordproject/template-engine"],
  },
});

export default viteConfig;
