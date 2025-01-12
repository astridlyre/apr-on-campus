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
				primary: "#facc15",
				primaryDark: "#eab308",
				primaryLight: "#fcd34d",
				secondary: "#2563eb",
				secondaryLight: "#3b82f6",
				secondaryDark: "#1e40af",
				fg: "#334155",
				fg2: "#64748b",
				bg: "#f8fafc",
				bg2: "#e2e8f0",
				disabled: "#e2e8f0",
				divider: "#cbd5e1",
				border: "#cbd5e1",
			},
			fontFamily: {
				sans: [
					'"Source Sans 3"',
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
