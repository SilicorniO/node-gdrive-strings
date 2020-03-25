import * as Fs from "fs"

export default class LangGenerator {
	public generateLangFiles(
		langs: { [key: string]: { [key: string]: string } },
		outputPath: string,
		cb: (value: boolean) => void,
	) {
		if (Object.keys(langs).length === 0) {
			return cb(true)
		}

		var langKey = Object.keys(langs)[0]
		var langData = langs[langKey]
		delete langs[langKey]

		// json to string
		var langDataString = JSON.stringify(langData, null, "\t")

		// convert the lang to a file
		Fs.writeFile(
			outputPath + "/" + langKey + ".json",
			langDataString,
			"utf8",
			() => {
				this.generateLangFiles(langs, outputPath, cb)
			},
		)
	}
}
