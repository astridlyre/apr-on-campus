import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			maxWidth: {
				prose: "80ch",
				heading: "120ch",
			},
			colors: {
				primary: "#bc4749",
				primaryDark: "#96393a",
				primaryLight: "#c96c6d",
				secondary: "#6a994e",
				secondaryLight: "#88ad71",
				secondaryDark: "#5f8a46",
				neutral: "#403d39",
				neutralLight: "#666461",
				neutralDark: "#33312e",
				fg: "#403d39",
				fg2: "#797774",
				fg3: "#a09e9c",
				bg0: "#fcfaf5",
				bg: "#f7f1e2",
				bg2: "#f2e8cf",
				bg3: "#dad1ba",
				bg4: "#c2baa6",
				disabled: "#ececeb",
				divider: "#c2baa6",
				border: "#c2baa6",
			},
			fontFamily: {
				sans: [
					'"Open Sans"',
					"Montserrat",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
		},
	},
	plugins: [typography(), forms()],
} satisfies Config;
