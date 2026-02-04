import { defineConfig } from "@rslib/core";

export default defineConfig({
	lib: [
		// ESM bundled
		{
			format: "esm",
			syntax: ["node 18"],
			dts: true,
			experiments: {
				advancedEsm: true,
			},
		},

		// CommonJS bundled
		{
			format: "cjs",
			syntax: ["node 18"],
		},

		// ESM bundleless
		{
			format: "esm",
			syntax: ["node 18"],
			dts: true,
			bundle: false,
			output: {
				distPath: "./dist/es",
			},
			outBase: "./src",
			experiments: {
				advancedEsm: true,
			},
		},
	],
});
