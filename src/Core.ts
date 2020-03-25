import LangGenerator from "./LangGenerator"
import DownloadManager from "./DownloadManager"
import CsvManager from "./CsvManager"

export default class Core {
	downloadManager = new DownloadManager()
	csvManager = new CsvManager()
	langGenerator = new LangGenerator()

	constructor() {}

	private executeSheet(
		sheetUrl: string,
		tempPath: string,
		langs: { [key: string]: { [key: string]: string} },
		cb: (result: boolean) => void,
	) {
		// download the sheet
		this.downloadManager.downloadFile(sheetUrl, tempPath, (result) => {
			if (!result) {
				console.log("Download sheet error: '" + sheetUrl + "'")
				cb(false)
				return
			}

			// convert to json
			this.csvManager.convertCsv(tempPath, (jsonData: { [key: string]: string }[] | null) => {
				if (jsonData == null) {
					cb(false)
					return
				}

				// add to languages
				this.csvManager.addJsonToLangs(jsonData, langs)

				// return ok
				cb(true)
			})
		})
	}

	private executeSheets(
		sheetUrls: string[],
		tempPath: string,
		langs: { [key: string]: { [key: string]: string} },
		cb: (result: boolean) => void,
	) {
		if (sheetUrls.length === 0) {
			return cb(true)
		}

		var sheetUrl = sheetUrls[0]
		sheetUrls.splice(0, 1)

		this.executeSheet(sheetUrl, tempPath, langs, (result) => {
			if (!result) {
				console.log("Error executing sheet '" + sheetUrl + "'")
			}

			// execute next sheet
			this.executeSheets(sheetUrls, tempPath, langs, cb)
		})
	}

	public run(
    sheetUrls: string[],
    tempPath: string,
    outputPath: string,
    cb: (result: boolean) => void,
  ) {
		const langs: { [key: string]: { [key: string]: string} } = {}

		this.executeSheets(sheetUrls, tempPath, langs, (result) => {
			if (!result) {
				return cb(false)
			}

			// generate langs files
			this.langGenerator.generateLangFiles(
				langs,
				outputPath,
				(result: boolean) => {
					if (!result) {
						return cb(false)
					}

					cb(true)
				},
			)
		})
	}
}
