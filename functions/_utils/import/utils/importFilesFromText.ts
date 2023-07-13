import { importFileUpload } from './importFileUpload'

export async function importFilesFromText(
  text: string,
  orgId: string
): Promise<string> {
  let newText = text

  // Extract all Firebase Storage URLs
  const matches = text.matchAll(
    /https:\/\/app.holaspirit.com\/public\/uploads\/[a-zA-Z0-9/._-]+/g
  )
  for (const [url] of matches) {
    // Save file to Nhost Storage
    const result = await importFileUpload(url, orgId)
    if (!result) continue

    // Replace url in text
    newText = newText.replaceAll(url, result.url)
  }

  return newText
}
