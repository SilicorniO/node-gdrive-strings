import CsvToJson from "csvtojson"

export default class CsvManager {
	convertCsv(url: string, cb: (result: { [key: string]: string }[] | null) => void) {
		CsvToJson({
			delimiter: ",",
		})
			.fromFile(url)
			.then(
				(jsonObj: { [key: string]: string }[]) => {
					cb(jsonObj)
				},
				(error: any) => {
					cb(null)
				},
			)
	}

	addJsonToLangs(
    jsonData: { [key: string]: string }[],
    langs: { [key: string]: { [key: string]: string} },
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
