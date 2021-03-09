import { Text, TextProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import marked from 'marked'
import React from 'react'

interface Props extends TextProps {
  children: string
}

const StyledText = styled(Text)`
  ul,
  ol {
    padding-left: 1.5em;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.35em;
  }
  h3 {
    font-size: 1.25em;
  }
  h4 {
    font-size: 1.2em;
  }
  h5 {
    font-size: 1.1em;
  }
  a {
    text-decoration: underline;
  }
`

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

export default function Markdown({ children, ...props }: Props) {
  return (
    <StyledText
      {...props}
      dangerouslySetInnerHTML={{
        __html: marked(children, { renderer, breaks: true }),
      }}
    />
  )
}
