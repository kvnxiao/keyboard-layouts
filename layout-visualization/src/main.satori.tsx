import fs from "node:fs";
import path from "node:path";
import App from "@/App";
import satori from "satori";

const interFontPath = path.join(
  import.meta.dirname,
  "..",
  "public",
  "Inter_18pt-Regular.ttf",
);

const svg = await satori(<App />, {
  width: 600,
  height: 400,
  embedFont: true,
  fonts: [
    {
      name: "Inter",
      data: fs.readFileSync(interFontPath),
      weight: 400,
      style: "normal",
    },
  ],
});

fs.writeFileSync(
  path.join(import.meta.dirname, "..", "public", "layout.svg"),
  svg,
);
