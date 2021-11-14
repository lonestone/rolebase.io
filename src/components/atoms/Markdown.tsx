import { BoxProps } from '@chakra-ui/react'
import marked, { MarkedOptions } from 'marked'
import React from 'react'
import BasicStyle from './BasicStyle'

interface Props extends BoxProps {
  children: string
}

// Add target="_blank" to external links
// https://github.com/markedjs/marked/issues/655
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href: string, title: string, text: string) => {
  const localLink = href.startsWith(
    `${location.protocol}//${location.hostname}`
  )
  const html = linkRenderer.call(renderer, href, title, text)
  return localLink ? html : html.replace(/^<a /, `<a target="_blank" `)
}

const options: MarkedOptions = {
  renderer,
  breaks: true,
}

export default function Markdown({ children, ...props }: Props) {
  return (
    <BasicStyle
      {...props}
      dangerouslySetInnerHTML={{
        __html: marked(children, options),
      }}
    />
  )
}
