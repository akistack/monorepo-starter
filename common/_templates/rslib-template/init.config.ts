import type { IConfig } from "../../autoinstallers/plugins/node_modules/rush-init-project-plugin";

const config: IConfig = {
	prompts: [
		{
			type: "list",
			name: "libraryType",
			message: "Select type of library",
			choices: [
				"infra",
				"config",
				"ui",
				"components",
				"domain",
				"utils",
				"other",
			],
		},
	],
	plugins: [],
	defaultProjectConfiguration: {
		tags: ["library"],
	},
};

export default config;
