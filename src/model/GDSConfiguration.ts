
export enum GDSConfigurationOutputType {
  JSON = 'json',
}

export default interface GDSConfiguration {

  /** Type of output */
  outputType: GDSConfigurationOutputType

  /** Folder path where to create the files */
  outputPath: string

  /** Temporary file path, can be used one by default */
  tempPath?: string
}