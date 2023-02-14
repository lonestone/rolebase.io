import SimpleEditor from '@molecules/editor/SimpleEditor'
import React from 'react'

interface Props {
  children: string
}

export default function Markdown({ children }: Props) {
  return <SimpleEditor value={children} readOnly />
}
