// https://firebasestorage.googleapis.com/v0/b/roles-app-37879.appspot.com/o/orgs%2FgPJFBHdKt4m63jMifYt3%2Fuploads%2Fecd7126400ee5142376ab6682c743fc09fceb152?alt=media&token=03ff0f00-d008-4b57-939e-c141eda1b9b2

import { storage } from './firebase'
import { id } from './oldIds'
import { saveFile } from './saveFile'

interface FileUrls {
  oldUrl: string
  newUrl: string
}

// https://firebasestorage.googleapis.com/v0/b/roles-app-37879.appspot.com/o/orgs%2FgPJFBHdKt4m63jMifYt3%2Fuploads%2F1f05ca4bdf3a083f804aa665132d0b6dba05e92f?alt=media&token=4f1fc654-544c-4958-b4bc-e82647a8cbdf
export async function saveFilesFromTexts<T>(obj: T): Promise<T> {
  // Extract all strings from the object
  const content = extractStrings(obj).join(' ')

  // Extract all Firebase Storage URLs
  const matches = content.matchAll(
    /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/roles-app-37879\.appspot\.com\/o\/orgs%2F([a-zA-Z0-9]+)%2Fuploads%2F([a-f0-9]+)\?alt=media&token=([a-f0-9-]+)/g
  )
  const files: Array<FileUrls> = []
  for (const [oldUrl, orgId, hash] of matches) {
    try {
      // Save file to Nhost Storage
      const result = await saveFileFromFirebase(orgId, hash)
      if (!result) continue
      files.push({ oldUrl, newUrl: result.url })
    } catch (e) {
      console.log(`Failed to save file ${oldUrl}: ${e.message}`)
    }
  }
  if (files.length === 0) return obj

  // Replace all Firebase Storage URLs with Nhost Storage URLs
  return replaceUrls(obj, files)
}

async function saveFileFromFirebase(orgId: string, hash: string) {
  // Download file from Firebase
  const result = await storage.file(`orgs/${orgId}/uploads/${hash}`).download()
  const buffer = result[0]
  if (!buffer) return

  // Upload file to Nhost Storage
  const name = `orgs/${id(orgId)}/uploads/${hash}`
  return saveFile(name, buffer)
}

function extractStrings<T>(obj: T): string[] {
  if (typeof obj === 'string') {
    return [obj]
  }
  if (Array.isArray(obj)) {
    return obj.flatMap(extractStrings)
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).flatMap(extractStrings)
  }
  return []
}

function replaceUrls<T>(obj: T, files: FileUrls[]): T {
  if (typeof obj === 'string') {
    return files.reduce(
      (str, { oldUrl, newUrl }) => str.replaceAll(oldUrl, newUrl),
      obj
    ) as T
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => replaceUrls(x, files)) as T
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        replaceUrls(value, files),
      ])
    ) as T
  }
  return obj
}
