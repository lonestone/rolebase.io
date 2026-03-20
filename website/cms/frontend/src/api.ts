const BASE = '/api'

export interface TreeNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: TreeNode[]
}

export interface GitFile {
  status: string
  staged: boolean
  path: string
}

export async function fetchTree(): Promise<TreeNode[]> {
  const res = await fetch(`${BASE}/tree`)
  return res.json()
}

export interface FrontmatterFieldSchema extends PropSchema {
  required?: boolean
}

export interface FileResponse {
  path: string
  content: string
  frontmatterSchema?: FrontmatterFieldSchema[]
}

export async function fetchFile(path: string): Promise<FileResponse> {
  const res = await fetch(`${BASE}/file?path=${encodeURIComponent(path)}`)
  return res.json()
}

export async function saveFile(
  path: string,
  content: string
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/file`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, content }),
  })
  return res.json()
}

export async function fetchGitStatus(): Promise<{ files: GitFile[] }> {
  const res = await fetch(`${BASE}/git/status`)
  return res.json()
}

export async function fetchGitDiff(path?: string): Promise<{ diff: string }> {
  const url = path
    ? `${BASE}/git/diff?path=${encodeURIComponent(path)}`
    : `${BASE}/git/diff`
  const res = await fetch(url)
  return res.json()
}

export async function gitCommit(
  message: string,
  push = false
): Promise<{ ok: boolean; commit?: string; error?: string }> {
  const res = await fetch(`${BASE}/git/commit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, push }),
  })
  return res.json()
}

export async function gitStage(paths: string[]): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/git/stage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paths }),
  })
  return res.json()
}

export async function gitUnstage(paths: string[]): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/git/unstage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paths }),
  })
  return res.json()
}

export async function gitDiscard(path: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/git/discard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  })
  return res.json()
}

export async function fetchClaudeStatus(): Promise<{
  authenticated: boolean
  url?: string
}> {
  const res = await fetch(`${BASE}/claude/status`)
  return res.json()
}

export function sendPrompt(
  prompt: string,
  onEvent: (event: any) => void,
  onDone: () => void
): AbortController {
  const controller = new AbortController()

  fetch(`${BASE}/claude/prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
    signal: controller.signal,
  }).then(async (res) => {
    const reader = res.body?.getReader()
    if (!reader) return

    const decoder = new TextDecoder()
    let buffer = ''

    // eslint-disable-next-line
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const data = JSON.parse(line.slice(5).trim())
            onEvent(data)
          } catch {
            // skip
          }
        }
        if (line.startsWith('event:done')) {
          onDone()
        }
      }
    }
    onDone()
  })

  return controller
}

export async function stopClaude(): Promise<void> {
  await fetch(`${BASE}/claude/stop`, { method: 'POST' })
}

export interface PropSchema {
  name: string
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'select'
    | 'json'
    | 'image'
    | 'date'
    | 'string-array'
  optional?: boolean
  options?: string[]
  itemSchema?: PropSchema[]
}

export interface ComponentDescriptor {
  name: string
  props: PropSchema[]
  hasChildren: boolean
}

export async function fetchComponents(): Promise<ComponentDescriptor[]> {
  const res = await fetch(`${BASE}/components`)
  return res.json()
}

export async function uploadMedia(
  file: File,
  targetDir: string
): Promise<{ ok: boolean; path: string; name: string }> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('targetDir', targetDir)
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    body: formData,
  })
  return res.json()
}
