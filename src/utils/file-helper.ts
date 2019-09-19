import * as path from "path"
import { fsExists, fsStat, fsReadFile } from "./wrappers";

const jsonFileCache: {
  [filename: string]: {
    modificationTimerstampe: number
    content: any
  }
} = {}

/**
 * Loads the content of a JSON-file and parses it into a Javascript object.
 * Will cache files by modification-time using nodes stats.mtimeMs property of the "fs" module
 * @param filename path or path-like that describes the file to load
 */
export async function loadJson<T>(filename: string): Promise<T> {
  const resolvedFilename = path.resolve(filename)

  const exists = await fsExists(resolvedFilename)
  if (!exists) {
    throw new Error(`Cannot load JSON from file. File dos not exist: ${resolvedFilename}`)
  }

  const stats = await fsStat(resolvedFilename)

  const cached = jsonFileCache[resolvedFilename]

  if(cached && cached.modificationTimerstampe === stats.mtimeMs) {
    return cached.content
  }

  const buffer = await fsReadFile(resolvedFilename)
  
  const jsonString = buffer.toString('utf8')
  const content = JSON.parse(jsonString)

  jsonFileCache[resolvedFilename] = {
    modificationTimerstampe: stats.mtimeMs,
    content
  }

  return content
}

export async function resolveAndCheckFilename(...segments: string[]): Promise<string> {
  const check = path.resolve(...segments)

  const exists = await fsExists(check)

  if(!exists) throw new Error(`Cannot find file '${check}', resolved from segments: [ ${segments.reduce((pv, cv) => `${pv}, ${cv} ` )}]`)

  return check
}

