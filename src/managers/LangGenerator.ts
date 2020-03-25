import * as Fs from "fs"
import GDSConfiguration, { GDSConfigurationOutputType } from "../model/GDSConfiguration"

export default class LangGenerator {
	public generateLangFiles(
		langs: { [key: string]: { [key: string]: string } },
		configuration: GDSConfiguration,
	): Promise<void> {
		return new Promise<void>( (resolve, reject) => {

			const writeFilePromises: Promise<void>[] = []
			for (const langKey of Object.keys(langs)) {
				const langData = langs[langKey]

				switch (configuration.outputType) {
					case GDSConfigurationOutputType.JSON: 
						writeFilePromises.push(this.generateJson(configuration, langKey, langData))
						break
					default:
						reject(`Error in configuration outputType parameter, is not valid: ${configuration.outputType}`)
						return
				}
				
			}

			// execute write file promises
			return Promise.all(writeFilePromises).then(
				() => resolve(),
			).catch(
				(error) => reject(`Error writing lang files, check PATH '${configuration.outputPath}': ${error}`)
			)
		})
	}

	private generateJson(
		configuration: GDSConfiguration,
		langKey: string,
		langData: { [key: string]: string },
	): Promise<void> {
		return new Promise( (resolve, reject) => {
			// json to string
			var langDataString = JSON.stringify(langData, null, "\t")

			// convert the lang to a file
			Fs.writeFile(
				configuration.outputPath + "/" + langKey + ".json",
				langDataString,
				"utf8",
				() => {
					resolve()
				},
			)
		})
	}
}
