/**
 * Describes a packages.json files content
 */
export interface PackageJSON {
  name: string
  version: string
  description?: string
  private?: boolean
  scripts?: {
    [name: string]: string
  }
  repository?: {
    type: string
    url: string
  }
  author?: string
  license?: string
  dependencies?: {
    [name: string]: string
  }
  devDependencies?: {
    [name: string]: string
  }
  peerDependencies?: {
    [name: string]: string
  }
}