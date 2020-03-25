import LangGenerator from "./managers/LangGenerator"
import DownloadManager from "./managers/DownloadManager"
import CsvManager from "./managers/CsvManager"
import GDSConfiguration from "./model/GDSConfiguration"
import Log from "./utils/log/Log"

export default class Core {

	// constants
	static readonly DEFAULT_TEMP_FILE_PATH = "./node-gdrive-strings.temp"

	// managers
	downloadManager = new DownloadManager()
	csvManager = new CsvManager()
	langGenerator = new LangGenerator()

	constructor() {}

	private executeSheet(
		sheetUrl: string,
		configuration: GDSConfiguration,
		langs: { [key: string]: { [key: string]: string } },
	): Promise<boolean> {
		Log.d(`Processing sheet ${sheetUrl}`)

		// define a temporary valid path
		const tempPath = configuration.tempPath || Core.DEFAULT_TEMP_FILE_PATH

		return new Promise((resolve, reject) => {
			// download the sheet
			this.downloadManager.downloadFile(sheetUrl, tempPath).then(
				() => {
					// convert to json
					this.csvManager.convertCsv(tempPath).then(
						(jsonData: { [key: string]: string }[]) => {
							// add to languages
							this.csvManager.addJsonToLangs(jsonData, langs)

							// remove temp path
							this.downloadManager.removeFile(tempPath)

							// resolve
							resolve(true)
						},
						(error) => {
							// remove temp path
							this.downloadManager.removeFile(tempPath)

							// reject
							Log.e(`Error converting data to CSV, it seems an app problem: ${error}`)
							resolve(false)
						},
					)
				},
				(error) => {
					Log.e(`Error downloading sheet ${sheetUrl}, check URL or permissions: ${error}`)
					resolve(false)
				},
			)
		})
	}

	public async run(
		sheetUrls: string[],
		configuration: GDSConfiguration,
		cb: (result: boolean) => void,
	) {
		const langs: { [key: string]: { [key: string]: string } } = {}

		// enable logs if enabled in configuration
		if (configuration.debug != null && configuration.debug == true) {
			Log.showLogsDebug = true
		}

		// prepare all sheet promises
		let resultOk = true
		for (const sheetUrl of sheetUrls) {
			resultOk = resultOk && await this.executeSheet(sheetUrl, configuration, langs)
		}

		// if false return here
		if (!resultOk) {
			cb(false)
			return
		}

		// generate langs files
		this.langGenerator.generateLangFiles(langs, configuration).then(
			() => cb(true),
			(error) => {
				Log.e(error)
				cb(false)
			},
		)
	}
}
