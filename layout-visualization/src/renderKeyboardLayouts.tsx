import fs from "node:fs";
import path from "node:path";
import { KeyboardLayerLayout } from "@/components/KeyboardLayerLayout";
import { KEY_SIZE_PX } from "@/components/keySize";
import { publicDir, rootLayoutsDir } from "@/paths";
import {
  type LayerSchemaType,
  validateKeyboardLayout,
} from "@/schemas/keyboardLayout";
import satori from "satori";

const interRegularFontPath = path.join(publicDir, "Inter_28pt-Regular.ttf");
const interMediumFontPath = path.join(publicDir, "Inter_28pt-Medium.ttf");
const interSemiBoldFontPath = path.join(publicDir, "Inter_28pt-SemiBold.ttf");
const interBoldFontPath = path.join(publicDir, "Inter_28pt-Bold.ttf");
const layoutJsons = fs
  .readdirSync(rootLayoutsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"));

interface KeyboardLayoutSvg {
  svgLayers: string[];
  fileName: string;
  layoutName: string;
}

function computeLayerWidthUnits(layer: LayerSchemaType) {
  return Math.max(
    ...layer.rows.map((row) =>
      row.type === "keys"
        ? row.keys.reduce((acc, key) => acc + (key.units ?? 1), 0)
        : 0,
    ),
  );
}

function computeLayerHeightUnits(layer: LayerSchemaType) {
  return layer.rows.reduce((acc, row) => {
    if (row.type === "keys") {
      return acc + 1;
    }
    return acc + (row.heightUnits ?? 0);
  }, 0);
}

export async function renderKeyboardLayouts(): Promise<KeyboardLayoutSvg[]> {
  return Promise.all(
    layoutJsons.map(async (layoutFile) => {
      const layoutPath = path.join(rootLayoutsDir, layoutFile.name);
      const layoutJson = JSON.parse(fs.readFileSync(layoutPath, "utf-8"));
      const layout = validateKeyboardLayout(layoutJson);

      const svgLayers: string[] = await Promise.all(
        layout.layers.map(async (layer) => {
          return await satori(<KeyboardLayerLayout layer={layer} />, {
            width: computeLayerWidthUnits(layer) * KEY_SIZE_PX,
            height: computeLayerHeightUnits(layer) * KEY_SIZE_PX,
            embedFont: true,
            fonts: [
              {
                name: "Inter",
                data: fs.readFileSync(interRegularFontPath),
                weight: 400,
                style: "normal",
              },
              {
                name: "Inter",
                data: fs.readFileSync(interMediumFontPath),
                weight: 500,
                style: "normal",
              },
              {
                name: "Inter",
                data: fs.readFileSync(interSemiBoldFontPath),
                weight: 600,
                style: "normal",
              },
              {
                name: "Inter",
                data: fs.readFileSync(interBoldFontPath),
                weight: 700,
                style: "normal",
              },
            ],
          });
        }),
      );

      return {
        svgLayers,
        fileName: layoutFile.name,
        layoutName: layout.name,
      };
    }),
  );
}
