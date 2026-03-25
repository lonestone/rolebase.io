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

// Claude agent

export interface ClaudeStatus {
  authenticated: boolean
  error?: string
  account?: { email?: string; organization?: string }
}

export async function fetchClaudeStatus(
  force = false
): Promise<ClaudeStatus> {
  const url = force
    ? `${BASE}/claude/status?force=true`
    : `${BASE}/claude/status`
  const res = await fetch(url)
  return res.json()
}

export interface LoginResult {
  manualUrl?: string
  automaticUrl?: string
  error?: string
}

export async function startClaudeLogin(): Promise<LoginResult> {
  const res = await fetch(`${BASE}/claude/login`, { method: 'POST' })
  return res.json()
}

export interface LoginWaitResult {
  account?: ClaudeStatus['account']
  error?: string
}

export async function waitClaudeLogin(): Promise<LoginWaitResult> {
  const res = await fetch(`${BASE}/claude/login/wait`, { method: 'POST' })
  return res.json()
}

export interface Conversation {
  id: string
  summary: string
  firstPrompt?: string
  lastModified: number
  customTitle?: string
}

export async function fetchConversations(
  limit = 20
): Promise<Conversation[]> {
  const res = await fetch(`${BASE}/claude/conversations?limit=${limit}`)
  return res.json()
}

export async function fetchConversationMessages(
  id: string
): Promise<any[]> {
  const res = await fetch(`${BASE}/claude/conversations/${id}/messages`)
  return res.json()
}

// Claude permissions

export interface PendingPermission {
  pending: true
  id: string
  toolName: string
  input: Record<string, unknown>
  title?: string
  decisionReason?: string
}

export async function respondToPermission(
  id: string,
  behavior: 'allow' | 'deny',
  message?: string
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/claude/permissions/${id}/respond`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ behavior, message }),
  })
  return res.json()
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
  slots: string[]
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
