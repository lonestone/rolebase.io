import React, { useState, useEffect, useCallback } from 'react'
import {
  imageDialogState$,
  closeImageDialog$,
  insertImage$,
  saveImage$,
} from '@mdxeditor/editor'
import { useCellValue, usePublisher } from '@mdxeditor/gurx'
import { useMediaModal } from './MediaModal.js'
import { useFilePath } from '../contexts/FilePathContext.js'
import { resolvePreviewSrc } from '../utils/resolvePreviewSrc.js'
import Button from '../../common/components/Button.js'

export function CustomImageDialog() {
  const state = useCellValue(imageDialogState$)
  const closeDialog = usePublisher(closeImageDialog$)
  const insertImage = usePublisher(insertImage$)
  const saveImage = usePublisher(saveImage$)
  const { openMediaModal } = useMediaModal()
  const filePath = useFilePath()!

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
  const previewSrc = resolvePreviewSrc(src, filePath)

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel()
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-md p-5 shadow-2xl">
        <h3 className="mb-4 text-sm font-semibold">
          {isEditing ? 'Edit image' : 'Insert image'}
        </h3>

        {/* Preview */}
        {previewSrc && (
          <div className="mb-3 bg-bg rounded p-2 text-center">
            <img
              src={previewSrc}
              alt=""
              className="max-h-30 max-w-full object-contain"
            />
          </div>
        )}

        {/* Source */}
        <label className="block mb-2 text-xs text-gray-500">
          Source
          <div className="flex gap-1.5 mt-1">
            <input
              type="text"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="./image.png"
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs font-mono"
            />
            <Button variant="primary" size="sm" onClick={handleSelectMedia}>
              Select
            </Button>
          </div>
        </label>

        {/* Alt text */}
        <label className="block mb-4 text-xs text-gray-500">
          Alt text
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe the image"
            className="block w-full mt-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
          />
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!src}>
            {isEditing ? 'Save' : 'Insert'}
          </Button>
        </div>
      </div>
    </div>
  )
}
