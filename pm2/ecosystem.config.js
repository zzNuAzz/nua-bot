module.exports = {
	apps: [
		{
			name: "NuA-Bot",
			script: "./dist/index.js",
			env: {
				NODE_ENV: "production",
			},
			interpreter: "node@16.12.0",
		},
	],
};
