import * as Https from "https"
import * as Fs from "fs"

export default class DownloadManager {
	downloadFile(url: string, path: string, cb: (result: boolean) => void) {
		const file = Fs.createWriteStream(path)
		Https.get(url, (response: any) => {
			response.pipe(file)
			file.on("finish", () => {
				cb(true)
			})
		}).on("error", () => {
			cb(false)
		})
	}
}
