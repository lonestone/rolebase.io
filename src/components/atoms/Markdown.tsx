import { BoxProps } from '@chakra-ui/react'
import MarkdownEditor from '@components/molecules/editor/MarkdownEditor'
import React from 'react'

interface Props extends BoxProps {
  children: string
}

export default function Markdown({ children }: Props) {
  return <MarkdownEditor value={children} readOnly />
}
