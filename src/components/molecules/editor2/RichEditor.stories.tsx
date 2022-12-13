import { Button, ButtonGroup, Textarea } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SerializedEditorState } from 'lexical'
import React, { useRef, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiCheckSquare, FiList } from 'react-icons/fi'
import { decorators } from '../../../stories'
import DUMMY_USERNAMES from './dummy-usernames.json'
import DUMMY_VALUE from './dummy-value.json'
import Editor from './Editor'
import { EditorHandle } from './plugins/EditorRefPlugin'

export default {
  title: 'RichEditor',
  component: Editor,
  decorators,
} as ComponentMeta<typeof Editor>

const Template: ComponentStory<typeof Editor> = (args) => {
  return <Editor mentionables={DUMMY_USERNAMES} {...args} />
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Enter some text...',
}

export const MinHeight = Template.bind({})
MinHeight.args = {
  minH: '4em',
}

export const MaxHeight = Template.bind({})
MaxHeight.args = {
  maxH: '200px',
  value: DUMMY_VALUE as SerializedEditorState,
}

export const Collab = Template.bind({})
Collab.args = {
  collaboration: true,
  username: DUMMY_USERNAMES[Math.floor(Math.random() * DUMMY_USERNAMES.length)],
}

export const EditorRef: ComponentStory<typeof Editor> = (args) => {
  const ref = useRef<EditorHandle>(null)
  const [result, setResult] = useState('')

  return (
    <>
      <Editor
        ref={ref}
        value={DUMMY_VALUE as SerializedEditorState}
        mentionables={DUMMY_USERNAMES}
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
