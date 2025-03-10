import fs from "node:fs";
import path from "node:path";
import { rootLayoutsDir } from "@/paths";
import { renderKeyboardLayouts } from "@/renderKeyboardLayouts";

const layouts = await renderKeyboardLayouts();

function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

for (const layout of layouts) {
  for (const [index, svgLayer] of layout.svgLayers.entries()) {
    fs.writeFileSync(
      path.join(
        rootLayoutsDir,
        `${stripExtension(layout.fileName)}-layer${index}.svg`,
      ),
      svgLayer,
    );
  }
}
