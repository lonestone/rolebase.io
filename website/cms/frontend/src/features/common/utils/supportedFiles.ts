const supportedExtensions = ['.mdx', '.md', '.yaml', '.yml', '.toml', '.json']

export function isSupportedFile(name: string): boolean {
  return supportedExtensions.some((ext) => name.endsWith(ext))
}

export function stripExtension(name: string): string {
  return name.replace(/\.[^.]+$/, '')
}
