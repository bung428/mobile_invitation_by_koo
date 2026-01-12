import path from "node:path";
// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { normalizePath } from "vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { createRequire } from "node:module";
import { viteStaticCopy } from "vite-plugin-static-copy";
// import { datadogVitePlugin } from "@datadog/vite-plugin";

const require = createRequire(import.meta.url);
const pdfJsCMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps")
);
const PdfJsStandardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts"
  )
);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env": process.env,
    },
    plugins: [
      // TanStackRouterVite(),
      react(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: pdfJsCMapsDir,
            dest: "",
          },
          {
            src: PdfJsStandardFontsDir,
            dest: "",
          },
          {
            src: "node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js",
            dest: "",
          },
          {
            src: "node_modules/@ricky0123/vad-web/dist/*.onnx",
            dest: "",
          },
          {
            src: "node_modules/onnxruntime-web/dist/*.wasm",
            dest: "",
          },
        ],
      }),
    ],
    server: {
      host: true,
      strictPort: true,
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      css: true,
    },
    resolve: {
      alias: [
        { find: "@src", replacement: path.resolve(__dirname, "src") },
        { find: "@apis", replacement: path.resolve(__dirname, "src/apis") },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "src/components"),
        },
        {
          find: "@features",
          replacement: path.resolve(__dirname, "src/features"),
        },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
        { find: "@store", replacement: path.resolve(__dirname, "src/store") },
        { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
        {
          find: "@custom_types",
          replacement: path.resolve(__dirname, "src/custom_types"),
        },
      ],
    },
  };
});
