import * as Https from "https"
import * as Fs from "fs"

export default class DownloadManager {

	/**
	 * Download file
	 * @param url 
	 * @param path 
	 */
	downloadFile(url: string, path: string): Promise<void> {
		return new Promise<void>( (resolve, reject) => {
			const file = Fs.createWriteStream(path)
			Https.get(url, (response: any) => {
				response.pipe(file)
				file.on("finish", () => {
					resolve()
				})
			}).on("error", (error) => {
				reject(error)
			})
		})
		
	}

	/**
	 * Remove file with given path
	 * @param path 
	 */
	removeFile(path: string) {
		try {
			Fs.unlinkSync(path)
		} catch(error) {
			console.error(`Error removing file ${path}: ${error}`)
		}
	}
}
