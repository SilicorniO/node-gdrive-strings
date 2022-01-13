import * as CsvToJson from "csvtojson"
import Log from "../utils/log/Log"

export default class CsvManager {

	static readonly ISO_LANGUAGE_LENGTH = 2

	convertCsv(text: string): Promise<{ [key: string]: string }[]> {
		return new Promise<{ [key: string]: string }[]>((resolve, reject) => {
			CsvToJson({
				delimiter: ",",
			})
				.fromString(text)
				.then(
					(jsonObj: { [key: string]: string }[]) => {
						resolve(jsonObj)
					},
					(error: any) => {
						reject(error)
					},
				)
		})
	}

	addJsonToLangs(
		jsonData: { [key: string]: string }[],
		langs: { [key: string]: { [key: string]: string } },
	) {
		jsonData.forEach((line: { [key: string]: string }) => {
			var jsonLineKey = ""
			Object.keys(line).forEach((lineKey: string) => {
				Log.d(`lineKey: '${lineKey}'`)
				const lineKeyLc = lineKey.toLowerCase()
				if (lineKeyLc === "key") {
					jsonLineKey = line[lineKey]
					Log.d(`LineKey found: '${jsonLineKey}'`)
				} else {
					// create lang if necessary
					if (!langs[lineKeyLc]) {

						// check language is iso
						if (lineKeyLc.length === CsvManager.ISO_LANGUAGE_LENGTH) {
							langs[lineKeyLc] = {}
							Log.d(`Language found: '${lineKeyLc}'`)
						} else {
							Log.e(`Language found but not valid: '${lineKeyLc}', check google drive document or export format`)
						}
					}

					// add key
					if (langs[lineKeyLc]) {
						langs[lineKeyLc][jsonLineKey] = line[lineKey]
					}
				}
			})
		})
	}
}
