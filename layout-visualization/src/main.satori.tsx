import fs from "node:fs";
import path from "node:path";
import { rootLayoutsDir } from "@/paths";
import { renderKeyboardLayouts } from "@/renderKeyboardLayouts";

const layouts = await renderKeyboardLayouts();

for (const layout of layouts) {
  fs.writeFileSync(
    path.join(rootLayoutsDir, `${layout.fileName}.svg`),
    layout.svgString,
  );
}
