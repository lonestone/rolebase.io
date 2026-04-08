import React from 'react'
import { MediaModalProvider } from './features/editor/components/MediaModal.js'
import { Layout } from './features/common/components/Layout.js'

export function App() {
  return (
    <MediaModalProvider>
      <Layout />
    </MediaModalProvider>
  )
}
