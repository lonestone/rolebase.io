import axios from 'axios'

export async function loadFileBuffer(url: string): Promise<Buffer | undefined> {
  const result = await axios.get(url, { responseType: 'arraybuffer' })
  if (result.status !== 200) {
    console.warn(`Error downloading file: ${url}`)
    return
  }

  return result.data
}
