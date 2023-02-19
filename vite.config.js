import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        mashup: resolve(__dirname, "mashup.html"),
        nonstop: resolve(__dirname, "nonstop.html"),
      },
    },
  },
});
