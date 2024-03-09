import axios from 'axios'

export async function loadFileBuffer(url: string): Promise<Buffer | undefined> {
  try {
    const result = await axios.get(url, { responseType: 'arraybuffer' })
    return result.data
  } catch (e) {
    console.warn(`Error downloading file: ${url}`)
  }
}
