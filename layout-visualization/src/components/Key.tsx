import { type KeyColor, keyColor } from "../colors";

interface KeyProps {
	uSize?: number;
	label:
		| {
				top?: string;
				bottom?: string;
		  }
		| string;
	color?: KeyColor;
}

const SIZE_MULTIPLIER_PX: number = 102;

export const Key: React.FC<KeyProps> = ({
	label,
	uSize = 1,
	color = keyColor.white,
}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: uSize * SIZE_MULTIPLIER_PX,
				height: SIZE_MULTIPLIER_PX,
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
						color: color.dark.hex(),
						textShadow: "0 0 1px rgb(0, 0, 0, 0.5)",
					}}
				>
					{uSize}u
				</div>
			</div>
		</div>
	);
};
