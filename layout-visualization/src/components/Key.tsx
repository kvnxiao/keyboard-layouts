import { keyColor } from "@/colors";
import { KEY_SIZE_PX } from "@/components/keySize";
import type { KeySchemaType } from "@/schemas/keyboardLayout";

interface KeyProps {
	value: KeySchemaType;
}

export const Key: React.FC<KeyProps> = ({ value }) => {
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
					<div>{label}</div>
				) : (
					<div
						style={{ display: "flex", flexDirection: "column", gap: "12px" }}
					>
						<div>{label.top}</div>
						<div>{label.bottom}</div>
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
