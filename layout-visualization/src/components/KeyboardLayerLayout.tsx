import { Key } from "@/components/Key";
import type { LayerSchemaType } from "@/schemas/keyboardLayout";

interface KeyboardLayerLayoutProps {
  layer: LayerSchemaType;
}

export const KeyboardLayerLayout: React.FC<KeyboardLayerLayoutProps> = ({
  layer,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter",
        fontWeight: 700,
      }}
    >
      {layer.rows.map((row, rowIndex) => (
        <div
          key={String(rowIndex)}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {row.type === "keys" &&
            row.keys.map((key, keyIndex) => (
              <Key key={String(keyIndex)} value={key} />
            ))}
        </div>
      ))}
    </div>
  );
};
