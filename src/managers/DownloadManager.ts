import * as Fs from "fs"
import * as Url from "url"
import Log from "../utils/log/Log"
import fetch from "node-fetch"

export default class DownloadManager {

	/**
	 * Download file
	 * @param url 
	 * @param path 
	 */
	downloadFile(url: string): Promise<string> {
		return new Promise<string>( (resolve, reject) => {
			fetch(url)
				.then(response => {
					response.text()
						.then((text) => {
							Log.d(`Sheet downloaded '${url}'`)
							resolve(text)
						})
						.catch(e => {
							Log.d(`Error reading sheet '${url}'`)
							reject(e)
						})				
				})
				.catch(e => {
					Log.d(`Error downloading sheet '${url}'`)
					reject(e)
				})
		})		
	}
}
