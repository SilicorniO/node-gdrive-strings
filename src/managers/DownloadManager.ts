import * as Https from "https"
import * as Fs from "fs"
import Log from "../utils/log/Log"

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
					Log.d(`Sheet downloaded '${url}' into '${path}'`)
					resolve()
				})
			}).on("error", (error) => {
				Log.d(`Error downloading sheet '${url}'`)
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
			Log.d(`Temporary file '${path}' deleted`)
		} catch(error) {
			Log.e(`Error removing file ${path}: ${error}`)
		}
	}
}
