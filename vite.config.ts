import { vitePlugin as remix } from "@remix-run/dev";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	plugins: [
		remix({
			ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
			future: {
				unstable_optimizeDeps: true,
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				v3_lazyRouteDiscovery: true,
				v3_singleFetch: true,
				v3_routeConfig: true,
			},
		}),
		tsconfigPaths(),
	],
	server: {
		port: 4000,
	},
});
