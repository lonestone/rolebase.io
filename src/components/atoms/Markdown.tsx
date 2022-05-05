import { BoxProps } from '@chakra-ui/react'
import SimpleEditor from '@components/molecules/editor/SimpleEditor'
import React from 'react'

interface Props extends BoxProps {
  children: string
}

export default function Markdown({ children }: Props) {
  return <SimpleEditor value={children} readOnly />
}
