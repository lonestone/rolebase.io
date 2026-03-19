import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useTree } from '../hooks/useTree.js'
import { uploadMedia, type TreeNode } from '../api.js'

// ---------------------------------------------------------------------------
// Context for opening the media modal from anywhere
// ---------------------------------------------------------------------------

interface MediaModalRequest {
  /** Directory to open in, relative to content dir (e.g. "blog/my-post") */
  initialDir: string
  /** Path of the MDX file being edited, used to compute relative paths */
  filePath: string
  /** Callback with the relative path to the selected media */
  onSelect: (relativePath: string) => void
}

interface MediaModalContextValue {
  openMediaModal: (request: MediaModalRequest) => void
}

export const MediaModalContext = createContext<MediaModalContextValue>({
  openMediaModal: () => {},
})

export function useMediaModal() {
  return useContext(MediaModalContext)
}

// ---------------------------------------------------------------------------
// Provider (wraps the app, renders the modal)
// ---------------------------------------------------------------------------

interface ProviderProps {
  children: React.ReactNode
}

export function MediaModalProvider({ children }: ProviderProps) {
  const [request, setRequest] = useState<MediaModalRequest | null>(null)

  const openMediaModal = useCallback((req: MediaModalRequest) => {
    setRequest(req)
  }, [])

  const handleClose = useCallback(() => setRequest(null), [])

  const handleSelect = useCallback(
    (relativePath: string) => {
      request?.onSelect(relativePath)
      setRequest(null)
    },
    [request]
  )

  return (
    <MediaModalContext.Provider value={{ openMediaModal }}>
      {children}
      {request && (
        <MediaModalOverlay
          initialDir={request.initialDir}
          filePath={request.filePath}
          onSelect={handleSelect}
          onClose={handleClose}
        />
      )}
    </MediaModalContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const IMAGE_EXTS = /\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/i

/** Find a subtree node by its path */
function findNode(nodes: TreeNode[], path: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.path === path) return node
    if (node.children) {
      const found = findNode(node.children, path)
      if (found) return found
    }
  }
  return undefined
}

/** Compute relative path from a file to a target entry */
function computeRelativePath(
  filePath: string,
  entryPath: string,
  entryName: string
): string {
  const fileDir = filePath.replace(/\/[^/]+$/, '')
  const entryDir = entryPath.replace(/\/[^/]+$/, '')

  if (fileDir === entryDir) {
    return `./${entryName}`
  }

  const fileParts = fileDir.split('/')
  const entryParts = entryPath.split('/')

  let common = 0
  while (
    common < fileParts.length &&
    common < entryParts.length &&
    fileParts[common] === entryParts[common]
  ) {
    common++
  }

  const ups = fileParts.length - common
  const rest = entryParts.slice(common).join('/')
  const prefix = ups > 0 ? '../'.repeat(ups) : './'
  return prefix + rest
}

// ---------------------------------------------------------------------------
// Modal overlay
// ---------------------------------------------------------------------------

interface MediaModalOverlayProps {
  initialDir: string
  filePath: string
  onSelect: (relativePath: string) => void
  onClose: () => void
}

function MediaModalOverlay({
  initialDir,
  filePath,
  onSelect,
  onClose,
}: MediaModalOverlayProps) {
  const [currentDir, setCurrentDir] = useState(initialDir)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { tree, invalidateTree } = useTree()

  // Get children for the current directory.
  // An empty currentDir means root (the tree itself).
  const children = useMemo(() => {
    if (!currentDir) return tree
    const node = findNode(tree, currentDir)
    return node?.children ?? []
  }, [tree, currentDir])
  const directories = children.filter((e) => e.type === 'directory')
  const mediaFiles = children.filter(
    (e) => e.type === 'file' && IMAGE_EXTS.test(e.name)
  )

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleNavigate = useCallback((path: string) => {
    setCurrentDir(path)
  }, [])

  const handleParent = useCallback(() => {
    const parent = currentDir.includes('/')
      ? currentDir.replace(/\/[^/]+$/, '')
      : ''
    setCurrentDir(parent)
  }, [currentDir])

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      await uploadMedia(file, currentDir)
      invalidateTree()
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [currentDir, invalidateTree]
  )

  const handleSelectEntry = useCallback(
    (entry: TreeNode) => {
      onSelect(computeRelativePath(filePath, entry.path, entry.name))
    },
    [filePath, onSelect]
  )

  const canGoUp = currentDir !== ''

  const previewUrl = (entry: TreeNode) => `/content/${entry.path}`

  const breadcrumb = currentDir || '/'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          width: 640,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid #e2e2e2',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Select media</span>
            <span
              style={{
                fontSize: 12,
                color: '#888',
                fontFamily: 'monospace',
              }}
            >
              {breadcrumb}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: 'var(--primary, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
                color: '#888',
                lineHeight: 1,
                padding: '0 4px',
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Navigation */}
        {canGoUp && (
          <div style={{ padding: '8px 16px 0' }}>
            <button
              onClick={handleParent}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--primary, #2563eb)',
                fontSize: 12,
                padding: 0,
                fontFamily: 'monospace',
              }}
            >
              &larr; Parent directory
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px 16px' }}>
          {/* Directories */}
          {directories.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {directories.map((entry) => (
                <div
                  key={entry.path}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open folder ${entry.name}`}
                  onClick={() => handleNavigate(entry.path)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleNavigate(entry.path)
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 8px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'monospace',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#f5f5f5')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <span style={{ fontSize: 14 }}>&#x1F4C1;</span>
                  {entry.name}
                </div>
              ))}
            </div>
          )}

          {/* Media files grid */}
          {mediaFiles.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: 8,
              }}
            >
              {mediaFiles.map((entry) => (
                <div
                  key={entry.path}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${entry.name}`}
                  onClick={() => handleSelectEntry(entry)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelectEntry(entry)
                    }
                  }}
                  style={{
                    border: '1px solid #e2e2e2',
                    borderRadius: 4,
                    padding: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      'var(--primary, #2563eb)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = '#e2e2e2')
                  }
                >
                  <img
                    src={previewUrl(entry)}
                    alt={entry.name}
                    style={{
                      width: '100%',
                      height: 80,
                      objectFit: 'contain',
                      background: '#fafafa',
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      fontFamily: 'monospace',
                    }}
                    title={entry.name}
                  >
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          ) : directories.length === 0 ? (
            <div
              style={{
                color: '#888',
                padding: 16,
                textAlign: 'center',
                fontSize: 13,
              }}
            >
              No media files in this directory
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
