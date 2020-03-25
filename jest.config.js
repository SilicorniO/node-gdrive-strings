const { defaults: tsjPreset } = require("ts-jest/presets")

module.exports = {
	...tsjPreset,
	preset: "react-native",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$",
	transform: {
		"^.+\\.(js|tsx?)$":
			"<rootDir>/node_modules/react-native/jest/preprocessor.js",
	},
	globals: {
		"ts-jest": {
			babelConfig: true,
		},
	},
	// This is the only part which you can keep
	// from the above linked tutorial"s config:
	cacheDirectory: ".jest/cache",
}
