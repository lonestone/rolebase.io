import { Button, ButtonGroup, Textarea } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiCheckSquare, FiList } from 'react-icons/fi'
import { readFile } from 'src/utils/readFile'
import { decorators } from '../../../stories'
import DUMMY_USERNAMES from './dummy-usernames.json'
import DUMMY_VALUE from './dummy-value.json'
import { EditorHandle } from './plugins/EditorRefPlugin'
import Editor, { RichEditorProps } from './RichEditor'

const dummyValueString = JSON.stringify(DUMMY_VALUE)

export default {
  title: 'RichEditor',
  component: Editor,
  decorators,
} as ComponentMeta<typeof Editor>

const Template: ComponentStory<typeof Editor> = (args) => {
  return <Editor mentionables={DUMMY_USERNAMES} onUpload={onUpload} {...args} />
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Enter some text...',
}

export const Autofocus = Template.bind({})
Autofocus.args = {
  autoFocus: true,
}

export const MinHeight = Template.bind({})
MinHeight.args = {
  minH: '4em',
}

export const MaxHeight = Template.bind({})
MaxHeight.args = {
  maxH: '200px',
  value: dummyValueString,
}

export const Readonly = Template.bind({})
Readonly.args = {
  readOnly: true,
  value: dummyValueString,
}

export const Collab = Template.bind({})
Collab.args = {
  collaboration: true,
  username: DUMMY_USERNAMES[Math.floor(Math.random() * DUMMY_USERNAMES.length)],
}

const MARKDOWN_VALUE = `# Welcome to the Editor story
  
  This is a **story** for the richtext editor. It contains:
  * List
  * [link](https://rolebase.io), 
  * \`code\`
  * _style!_
  `

export const Markdown = Template.bind({})
Markdown.args = {
  value: MARKDOWN_VALUE,
}

export const Multiple: ComponentStory<typeof Editor> = (args) => {
  const props: RichEditorProps = {
    maxH: '200px',
    mentionables: DUMMY_USERNAMES,
    onUpload,
    ...args,
  }

  return (
    <>
      <Editor value="Editor 1" {...props} />
      <Editor value="Editor 2" {...props} />
      <Editor value="Editor 3" {...props} />
    </>
  )
}
Multiple.args = {}

export const EditorRef: ComponentStory<typeof Editor> = (args) => {
  const ref = useRef<EditorHandle>(null)
  const [result, setResult] = useState('')

  return (
    <>
      <Editor
        ref={ref}
        value={dummyValueString}
        maxH="300px"
        mentionables={DUMMY_USERNAMES}
        onUpload={onUpload}
        {...args}
      />

      <ButtonGroup size="sm" my={2}>
        <Button
          leftIcon={<FiArrowDown />}
          onClick={() =>
            setResult(JSON.stringify(ref.current?.getValue(), null, 2))
          }
        >
          Get
        </Button>
        <Button
          leftIcon={<FiArrowUp />}
          onClick={() => ref.current?.setValue(JSON.parse(result))}
        >
          Set
        </Button>
        <Button
          leftIcon={<FiList />}
          onClick={() => ref.current?.addBulletList()}
        >
          Add Bullet
        </Button>
        <Button
          leftIcon={<FiCheckSquare />}
          onClick={() => ref.current?.addCheckboxList()}
        >
          Add Checkbox
        </Button>
      </ButtonGroup>

      <Textarea value={result} onChange={(e) => setResult(e.target.value)} />
    </>
  )
}
EditorRef.args = {}

// Mock file upload
const onUpload = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate a newtork delay
  const url = await readFile(file)
  if (!url) throw new Error('Failed to read file')
  return url
}
