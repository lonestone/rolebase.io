import React, { useState, useEffect, useCallback } from 'react'
import {
  imageDialogState$,
  closeImageDialog$,
  insertImage$,
  saveImage$,
} from '@mdxeditor/editor'
import { useCellValue, usePublisher } from '@mdxeditor/gurx'
import { useMediaModal } from './MediaModal.js'
import { FilePathContext } from './CustomJsxEditor.js'

export function CustomImageDialog() {
  const state = useCellValue(imageDialogState$)
  const closeDialog = usePublisher(closeImageDialog$)
  const insertImage = usePublisher(insertImage$)
  const saveImage = usePublisher(saveImage$)
  const { openMediaModal } = useMediaModal()
  const filePath = React.useContext(FilePathContext)

  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')

  const isEditing = state.type === 'editing'
  const isActive = state.type !== 'inactive'

  // Sync form state when dialog opens
  useEffect(() => {
    if (state.type === 'editing') {
      setSrc(state.initialValues.src ?? '')
      setAlt(state.initialValues.altText ?? '')
    } else if (state.type === 'new') {
      setSrc('')
      setAlt('')
    }
  }, [state])

  const handleSelectMedia = useCallback(() => {
    const initialDir = filePath.replace(/\/[^/]+$/, '')
    openMediaModal({
      initialDir,
      filePath,
      onSelect: (relativePath) => {
        setSrc(relativePath)
      },
    })
  }, [filePath, openMediaModal])

  const handleSave = useCallback(() => {
    if (!src) return
    if (isEditing) {
      saveImage({ src, altText: alt })
    } else {
      insertImage({ src, altText: alt })
    }
    closeDialog()
  }, [src, alt, isEditing, insertImage, saveImage, closeDialog])

  const handleCancel = useCallback(() => {
    closeDialog()
  }, [closeDialog])

  if (!isActive) return null

  // Resolve preview URL
  let previewSrc: string | undefined
  if (src) {
    if (
      src.startsWith('./') ||
      (!src.startsWith('/') && !src.startsWith('http'))
    ) {
      const dir = filePath.replace(/\/[^/]+$/, '')
      const filename = src.replace(/^\.\//, '')
      previewSrc = `/content/${dir}/${filename}`
    } else {
      previewSrc = src
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.3)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel()
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          width: 420,
          padding: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>
          {isEditing ? 'Edit image' : 'Insert image'}
        </h3>

        {/* Preview */}
        {previewSrc && (
          <div
            style={{
              marginBottom: 12,
              background: '#fafafa',
              borderRadius: 4,
              padding: 8,
              textAlign: 'center',
            }}
          >
            <img
              src={previewSrc}
              alt=""
              style={{
                maxHeight: 120,
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Source */}
        <label
          style={{
            display: 'block',
            marginBottom: 8,
            fontSize: 12,
            color: '#666',
          }}
        >
          Source
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <input
              type="text"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="./image.png"
              style={{
                flex: 1,
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: 13,
                fontFamily: 'monospace',
              }}
            />
            <button
              type="button"
              onClick={handleSelectMedia}
              style={{
                background: 'var(--primary, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 12px',
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Select
            </button>
          </div>
        </label>

        {/* Alt text */}
        <label
          style={{
            display: 'block',
            marginBottom: 16,
            fontSize: 12,
            color: '#666',
          }}
        >
          Alt text
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe the image"
            style={{
              display: 'block',
              width: '100%',
              marginTop: 4,
              padding: '6px 8px',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: 13,
              boxSizing: 'border-box',
            }}
          />
        </label>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            onClick={handleCancel}
            style={{
              background: 'none',
              border: '1px solid #ddd',
              borderRadius: 4,
              padding: '6px 16px',
              fontSize: 13,
              cursor: 'pointer',
              color: '#666',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!src}
            style={{
              background: src ? 'var(--primary, #2563eb)' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '6px 16px',
              fontSize: 13,
              cursor: src ? 'pointer' : 'default',
            }}
          >
            {isEditing ? 'Save' : 'Insert'}
          </button>
        </div>
      </div>
    </div>
  )
}
