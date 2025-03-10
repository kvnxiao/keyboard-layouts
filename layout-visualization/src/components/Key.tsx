import { keyColor } from "@/colors";
import { KEY_SIZE_PX } from "@/components/keySize";
import type { KeySchemaType } from "@/schemas/keyboardLayout";

interface KeyProps {
  value: KeySchemaType;
}

export const Key: React.FC<KeyProps> = ({ value }) => {
  if (!("label" in value)) {
    return (
      <div
        style={{
          width: value.units * KEY_SIZE_PX,
          height: KEY_SIZE_PX,
          background: "transparent",
        }}
      />
    );
  }

  const color = keyColor[value.color ?? "white"];
  const units = value.units ?? 1;
  const label = value.label;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: units * KEY_SIZE_PX,
        height: KEY_SIZE_PX,
        backgroundColor: color.dark.hex(),
        border: "2px solid black",
        borderRadius: "9px",
        alignItems: "center",
        padding: "5px 10px 15px 10px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: color.light.hex(),
          boxShadow:
            "1px 1px 1px 1px rgb(0, 0, 0, 0.05), -1px -1px 1px 1px rgb(0, 0, 0, 0.05)",
          borderRadius: "6px",
        }}
      >
        {typeof label === "string" ? (
          <div style={{ fontSize: "24px" }}>{label}</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "18px" }}>{label.top}</div>
            <div style={{ fontSize: "18px" }}>{label.bottom}</div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "2px",
            left: "2px",
            fontSize: "12px",
            color: color.dark.isLight()
              ? color.dark.darken(0.5).hex()
              : color.dark.lighten(0.5).hex(),
          }}
        >
          {units}u
        </div>
      </div>
    </div>
  );
};
