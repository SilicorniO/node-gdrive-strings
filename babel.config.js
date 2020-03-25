module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			"module-resolver",
			{
				root: ["./src"],
				extensions: [
					"ts",
					"tsx",
					".js",
					".jsx",
					".es",
					".es6",
					".mjs",
					".json",
				],
			},
		],
		[
			"@babel/plugin-proposal-decorators",
			{
				legacy: true,
			},
		],
	],
}
