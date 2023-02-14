import {
  Button,
  ButtonGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { readFile } from '@utils/readFile'
import { nanoid } from 'nanoid'
import React, { useRef, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiCheckSquare, FiList } from 'react-icons/fi'
import { decorators } from '../../../../stories'
import { DUMMY_MARKDOWN } from './dummies/dummy-markdown'
import DUMMY_USERNAMES from './dummies/dummy-usernames.json'
import DUMMY_VALUE from './dummies/dummy-value.json'
import { MentionEntities } from './nodes/MentionNode'
import { EditorHandle } from './plugins/EditorRefPlugin'
import { Mentionable } from './plugins/MentionsPlugin'
import Editor, { RichEditorProps } from './RichEditor'

// Dummy values
const dummyValueString = JSON.stringify(DUMMY_VALUE)
const dummyMentionables = DUMMY_USERNAMES.map(
  (username): Mentionable => ({
    id: nanoid(6),
    name: username,
    entity: MentionEntities.Member,
  })
)
const placeholder = 'Enter some text...'

export default {
  title: 'RichEditor',
  component: Editor,
  decorators,
} as ComponentMeta<typeof Editor>

const Template: ComponentStory<typeof Editor> = (args) => {
  return (
    <Editor mentionables={dummyMentionables} onUpload={onUpload} {...args} />
  )
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder,
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

export const ReadonlyEmpty = Template.bind({})
ReadonlyEmpty.args = {
  readOnly: true,
  placeholder,
  value: '',
}

export const Markdown = Template.bind({})
Markdown.args = {
  value: DUMMY_MARKDOWN,
}

export const Collab = Template.bind({})
Collab.args = {
  id: 'storybook-rich-editor',
  collaboration: true,
  username: DUMMY_USERNAMES[Math.floor(Math.random() * DUMMY_USERNAMES.length)],
}

export const CollabMarkdown = Template.bind({})
CollabMarkdown.args = {
  id: 'storybook-rich-editor-markdown',
  value: DUMMY_MARKDOWN,
  collaboration: true,
  username: DUMMY_USERNAMES[Math.floor(Math.random() * DUMMY_USERNAMES.length)],
}

export const Multiple: ComponentStory<typeof Editor> = (args) => {
  const props: RichEditorProps = {
    maxH: '200px',
    mentionables: dummyMentionables,
    onUpload,
    ...args,
  }

  return (
    <VStack align="stretch">
      <Editor value="Editor 1" {...props} />
      <Editor value="Editor 2" {...props} />
      <Editor value="Editor 3" {...props} />
    </VStack>
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
        mentionables={dummyMentionables}
        onUpload={onUpload}
        {...args}
      />

      <ButtonGroup size="sm" my={2}>
        <Button
          leftIcon={<FiArrowDown />}
          onClick={() => ref.current && setResult(ref.current?.getValue())}
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

export const InModal: ComponentStory<typeof Editor> = (args) => {
  const modal = useDisclosure()
  return (
    <>
      <Button onClick={modal.onOpen}>Open Modal</Button>
      <Modal size="xl" isOpen={modal.isOpen} onClose={modal.onOpen}>
        <ModalOverlay />
        <ModalContent>
          <Editor
            value={dummyValueString}
            mentionables={dummyMentionables}
            onUpload={onUpload}
            {...args}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
InModal.args = {}

// Mock file upload
const onUpload = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate a newtork delay
  const url = await readFile(file)
  if (!url) throw new Error('Failed to read file')
  return url
}
