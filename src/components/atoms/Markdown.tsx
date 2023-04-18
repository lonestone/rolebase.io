import SimpleEditor from '@molecules/editor/SimpleEditor'

interface Props {
  children: string
}

export default function Markdown({ children }: Props) {
  return <SimpleEditor value={children} readOnly />
}
