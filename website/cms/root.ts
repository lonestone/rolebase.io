import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// Website root directory (parent of cms/)
const __dirname = dirname(fileURLToPath(import.meta.url))
export const ROOT_DIR = resolve(__dirname, '..')
