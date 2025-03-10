import fs from "node:fs";
import path from "node:path";
import { renderKeyboardLayouts } from "@/renderKeyboardLayouts";
import { rootLayoutsDir } from "@/paths";

const layouts = await renderKeyboardLayouts();

for (const layout of layouts) {
	fs.writeFileSync(
		path.join(rootLayoutsDir, `${layout.fileName}.svg`),
		layout.svgString,
	);
}
