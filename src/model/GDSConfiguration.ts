
export enum GDSConfigurationOutputType {
  JSON = 'json',
}

export default interface GDSConfiguration {

  /** Type of output */
  outputType: GDSConfigurationOutputType

  /** Folder path where to create the files */
  outputPath: string

  /** Show debug logs */
  debug?: boolean
}