import * as fs from "fs"
import { URL } from "url"

export async function fsExists(pathOrPathLike: string): Promise<boolean> {
  return new Promise((resolve) => fs.exists(pathOrPathLike, resolve))
}

export async function fsStat(path: fs.PathLike): Promise<fs.Stats> {
  return new Promise((resolve, reject) =>
    fs.stat(path, (err, stats) => err ? reject(err) : resolve(stats))
  )
}

export async function fsReadFile(path: string | number | Buffer | URL): Promise<Buffer> {
  return new Promise((resolve, reject) => 
    fs.readFile(path, (err, data) => err ? reject(err) : resolve(data))
  )
}
