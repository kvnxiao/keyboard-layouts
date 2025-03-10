import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  ssr: {
    external: ["react", "react-dom"],
  },
  plugins: [
    tsconfigPaths(),
    devServer({
      entry: "src/server.tsx",
    }),
  ],
});
