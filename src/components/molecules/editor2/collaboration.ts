/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import settings from 'src/settings'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'

// parent dom -> child doc
export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>
): WebsocketProvider {
  let doc = yjsDocMap.get(id)

  if (doc) {
    doc.load()
  } else {
    doc = new Doc()
    yjsDocMap.set(id, doc)
  }

  return new WebsocketProvider(settings.yjsCollab.url, id, doc, {
    connect: false,
  })
}
