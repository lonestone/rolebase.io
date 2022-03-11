import { randomColor } from '@chakra-ui/theme-tools'
import { keymap } from 'prosemirror-keymap'
import { Extension } from 'rich-markdown-editor'
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from 'y-prosemirror'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'

interface YCollabContext {
  docId: string
  ydoc: Y.Doc
  provider: WebrtcProvider
  yXmlFragment: Y.XmlFragment
}

// Map contexts by id to keep provider and ydoc for each document
const contexts: Map<string, YCollabContext> = new Map()

export class YCollabExtension extends Extension {
  public ydoc: Y.Doc
  public provider: WebrtcProvider
  public yXmlFragment: Y.XmlFragment

  constructor(public docId: string) {
    super()

    const { ydoc, yXmlFragment, provider } = this.getContext()
    this.ydoc = ydoc
    this.yXmlFragment = yXmlFragment
    this.provider = provider
  }

  get name() {
    return 'y-collab'
  }

  get plugins() {
    return [
      ySyncPlugin(this.yXmlFragment),
      yCursorPlugin(this.provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ]
  }

  getContext(): YCollabContext {
    const existingProvider = contexts.get(this.docId)
    if (existingProvider) return existingProvider

    // Create new Y doc
    const ydoc = new Y.Doc()

    // Connect WebRTC provider with doc
    const provider = new WebrtcProvider(this.docId, ydoc)
    const yXmlFragment = ydoc.getXmlFragment('prosemirror')

    const context = {
      docId: this.docId,
      ydoc,
      provider,
      yXmlFragment,
    }

    contexts.set(this.docId, context)
    return context
  }

  stop() {
    const context = contexts.get(this.docId)
    if (!context) return
    context.provider.destroy()
    contexts.delete(this.docId)
  }

  setUserName(userName: string) {
    // Set username
    this.provider.awareness.setLocalStateField('user', {
      color: randomColor({ string: userName }),
      name: userName,
    })
  }
}
