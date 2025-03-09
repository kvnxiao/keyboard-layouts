import Color, { type ColorInstance } from "color";

export interface KeyColor {
	light: ColorInstance;
	dark: ColorInstance;
}

export const keyColor: Record<string, KeyColor> = {
	white: {
		light: Color("hsl(0, 0%, 99%)"),
		dark: Color("hsl(0, 0%, 80%)"),
	},
	lavenderBlue: {
		light: Color("hsl(242, 89%, 79%)"),
		dark: Color("hsl(242, 54%, 66%)"),
	},
	paleGreen: {
		light: Color("hsl(129, 97%, 89%)"),
		dark: Color("hsl(129, 62%, 69%)"),
	},
	paleLime: {
		light: Color("hsl(74, 100%, 89%)"),
		dark: Color("hsl(79, 64%, 81%)"),
	},
	paleCyan: {
		light: Color("hsl(180, 100%, 93%)"),
		dark: Color("hsl(167, 37%, 75%)"),
	},
	paleRose: {
		light: Color("hsl(355, 100%, 96%)"),
		dark: Color("hsl(1, 51%, 82%)"),
	},
};
