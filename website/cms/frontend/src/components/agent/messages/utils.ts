/** Strip absolute paths to project-relative paths */
export function relativePath(filePath: string | undefined): string {
  if (!filePath) return ''
  return filePath
    .replace(/^\/Users\/[^/]+\/Projets\/rolebase\//, '')
    .replace(/^\/[^/]+\/[^/]+\/[^/]+\//, '')
}

/** Extract text from various result content formats */
export function formatResult(content: any): string {
  if (content == null) return ''
  if (typeof content === 'string') return stripLineNumbers(content)
  if (Array.isArray(content)) {
    return content
      .filter((b: any) => b.type === 'text')
      .map((b: any) => stripLineNumbers(b.text))
      .join('\n')
  }
  return JSON.stringify(content)
}

/** Strip "Human: " / "Assistant: " prefixes added by the SDK */
export function stripRolePrefix(text: string): string {
  return text.replace(/^(Human|Assistant):\s*/i, '')
}

/** Strip `cat -n` style line number prefixes (e.g. "     1→content") */
function stripLineNumbers(text: string): string {
  if (!text) return ''
  const lines = text.split('\n')
  // Check if most lines match the pattern
  const matches = lines.filter((l) => /^\s*\d+→/.test(l)).length
  if (matches < lines.length * 0.5) return text
  return lines.map((l) => l.replace(/^\s*\d+→/, '')).join('\n')
}
