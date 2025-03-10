import fs from "node:fs";
import path from "node:path";
import { KeyboardLayout } from "@/components/KeyboardLayout";
import { KEY_SIZE_PX } from "@/components/keySize";
import { publicDir, rootLayoutsDir } from "@/paths";
import {
  type KeyboardLayoutType,
  validateKeyboardLayout,
} from "@/schemas/keyboardLayout";
import satori from "satori";

const openCherryFontPath = path.join(publicDir, "OpenCherry-Regular.otf");
const layoutJsons = fs
  .readdirSync(rootLayoutsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"));

interface KeyboardLayoutSvg {
  svgString: string;
  fileName: string;
  layoutName: string;
}

function computeLayoutWidthUnits(layout: KeyboardLayoutType) {
  const rows = layout.rows;
  const rowWidths = rows.map((row) => {
    if (row.type === "keys") {
      return row.keys.reduce((acc, key) => acc + (key.units ?? 1), 0);
    }
    return 0;
  });
  return Math.max(...rowWidths);
}

function computeLayoutHeightUnits(layout: KeyboardLayoutType) {
  const rows = layout.rows;
  const rowHeights = rows.reduce((acc, row) => {
    if (row.type === "keys") {
      return acc + 1;
    }
    return acc + (row.heightUnits ?? 0);
  }, 0);
  return rowHeights;
}

export async function renderKeyboardLayouts(): Promise<KeyboardLayoutSvg[]> {
  return Promise.all(
    layoutJsons.map(async (layoutFile) => {
      const layoutPath = path.join(rootLayoutsDir, layoutFile.name);
      const layoutJson = JSON.parse(fs.readFileSync(layoutPath, "utf-8"));
      const layout = validateKeyboardLayout(layoutJson);
      const widthUnits = computeLayoutWidthUnits(layout);
      const heightUnits = computeLayoutHeightUnits(layout);
      const svgString = await satori(<KeyboardLayout layout={layout} />, {
        width: widthUnits * KEY_SIZE_PX,
        height: heightUnits * KEY_SIZE_PX,
        embedFont: true,
        fonts: [
          {
            name: "OpenCherry",
            data: fs.readFileSync(openCherryFontPath),
            weight: 400,
            style: "normal",
          },
        ],
      });
      return {
        svgString,
        fileName: layoutFile.name,
        layoutName: layout.name,
      };
    }),
  );
}
