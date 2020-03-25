import * as CsvToJson from "csvtojson"

export default class CsvManager {
	convertCsv(url: string): Promise<{ [key: string]: string }[]> {
		return new Promise<{ [key: string]: string }[]>((resolve, reject) => {
			CsvToJson({
				delimiter: ",",
			})
				.fromFile(url)
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
				if (lineKey.toLowerCase() === "key") {
					jsonLineKey = line[lineKey]
				} else {
					// create lang if necessary
					if (!langs[lineKey.toLowerCase()]) {
						langs[lineKey.toLowerCase()] = {}
					}

					// add key
					langs[lineKey.toLowerCase()][jsonLineKey] = line[lineKey]
				}
			})
		})
	}
}
