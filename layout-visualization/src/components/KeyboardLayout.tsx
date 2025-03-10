import { Key } from "@/components/Key";
import type { KeyboardLayoutType } from "@/schemas/keyboardLayout";

interface KeyboardLayoutProps {
	layout: KeyboardLayoutType;
}

export const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ layout }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				fontFamily: "OpenCherry",
			}}
		>
			{layout.rows.map((row, rowIndex) => (
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
