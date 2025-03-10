import { type } from "arktype";
import { keyColor, type KeyColorName } from "@/colors";

const KeyLabelSchema = type({
	top: "string",
	bottom: "string",
}).or("string");

export const KeySchema = type({
	label: KeyLabelSchema,
	"units?": "number",
	"color?": type("string").narrow<KeyColorName>((data, ctx) => {
		if (data in keyColor) {
			return true;
		}
		return ctx.reject(`Invalid color key: ${data}`);
	}),
});

export const RowKeySchema = type({
	type: "'keys'",
	keys: KeySchema.array(),
});

export const RowSpacingSchema = type({
	type: "'spacing'",
	heightUnits: "number",
});

export const RowSchema = RowKeySchema.or(RowSpacingSchema);

export const KeyboardLayoutSchema = type({
	name: "string",
	rows: RowSchema.array(),
});

export type KeyboardLayoutType = typeof KeyboardLayoutSchema.infer;
export type KeySchemaType = typeof KeySchema.infer;

export function validateKeyboardLayout(layout: unknown): KeyboardLayoutType {
	const out = KeyboardLayoutSchema(layout);
	if (out instanceof type.errors) {
		throw new Error(out.summary);
	}
	return out;
}
