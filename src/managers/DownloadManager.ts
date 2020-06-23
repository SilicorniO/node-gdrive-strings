import * as Https from "https"
import * as Fs from "fs"
import * as Url from "url"
import Log from "../utils/log/Log"
import { IncomingMessage } from "http"

export default class DownloadManager {

	/**
	 * Download file
	 * @param url 
	 * @param path 
	 */
	downloadFile(url: string, path: string): Promise<void> {
		return new Promise<void>( (resolve, reject) => {
			const file = Fs.createWriteStream(path)
			Https.get(url, (response: IncomingMessage) => {

				// check response is valid
				const urlRedirect = this.checkRedirect(response, url)
				if (urlRedirect != null) {
					this.downloadFile(urlRedirect, path).then(
						(response) => resolve(response),
						(error) => reject(error),
					)
					return
				}

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

	/**
	 * Check if response is a redirect
	 * @param response received from connection
	 * @param url that was redirected
	 * @return url redirect or null if no redirect
	 */
	private checkRedirect(response: IncomingMessage, url: string) {
		// check status
		if (
			response.statusCode == null ||
			response.statusCode < 300 ||
			response.statusCode >= 400 ||
			response.headers.location == null
		) {
			return null
		}

		// get redirect url parsing location
		if (Url.parse(response.headers.location).hostname) {
			return response.headers.location
		} else {
			return Url.parse(url) + response.headers.location
		}
	}
}
