interface KeyProps {
	uSize: number;
}

const SIZE_WIDTH_MULTIPLIER: number = 10;

export const Key: React.FC<KeyProps> = ({ uSize }) => {
	return (
		<div
			style={{
				display: "flex",
				width: uSize * SIZE_WIDTH_MULTIPLIER,
				height: uSize * SIZE_WIDTH_MULTIPLIER,
				backgroundColor: "red",
			}}
		/>
	);
};
