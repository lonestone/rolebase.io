import React, { createContext, useContext } from 'react'

const FilePathContext = createContext<string | null>(null)

export function FilePathProvider({
  filePath,
  children,
}: {
  filePath: string | null
  children: React.ReactNode
}) {
  return (
    <FilePathContext.Provider value={filePath}>
      {children}
    </FilePathContext.Provider>
  )
}

export function useFilePath(): string | null {
  return useContext(FilePathContext)
}
