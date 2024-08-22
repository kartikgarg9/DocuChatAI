import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "public", // Directory where the build files will be output
    rollupOptions: {
      input: {
        main: "index.html", // Ensure this is correctly set
      },
    },
  },
});
