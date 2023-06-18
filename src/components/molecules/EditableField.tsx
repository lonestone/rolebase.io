import { Box, BoxProps, Button, Heading, Icon } from '@chakra-ui/react'
import useEscKey from '@hooks/useEscKey'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { EditorHandle } from '@molecules/editor'
import SimpleEditor from '@molecules/editor/SimpleEditor'
import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit3 } from 'react-icons/fi'
import { fieldsGap } from './circle/CircleRoleFormControl'

interface Props extends Omit<BoxProps, 'value'> {
  label: string
  placeholder?: string
  editable: boolean
  hideTitle?: boolean
  value: string
  onSave(value: string): void
}

export function EditableField({
  label,
  placeholder,
  editable,
  hideTitle,
  value,
  onSave,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const hoverStyle = useHoverItemStyle()

  // State
  const [isEditing, setIsEditing] = useState(false)
  const isButton = !value && !isEditing
  const canOpenEdit = editable && !isEditing

  const editorRef = useRef<EditorHandle>(null)

  const handleSubmit = async () => {
    if (!editorRef.current) return
    setIsEditing(false)
    const newValue = editorRef.current.getValue(true)
    onSave(newValue)
  }

  const handleCancel = useCallback(() => {
    if (!isEditing) return
    editorRef.current?.setValue(value)
    setIsEditing(false)
  }, [isEditing, value])

  // Cancel on escape if value didn't change
  useEscKey(
    useCallback(() => {
      if (!isEditing || editorRef.current?.getValue(true) !== value) {
        return
      }
      handleCancel()
    }, [isEditing, handleCancel])
  )

  // Hide if read only and empty
  if (!editable && isButton) return null

  return (
    <Box my={isButton ? 2 : fieldsGap} {...boxProps}>
      {isButton ? (
        <Button
          variant="outline"
          size="sm"
          leftIcon={<FiEdit3 />}
          onClick={() => setIsEditing(true)}
        >
          {label}
        </Button>
      ) : (
        <>
          {!hideTitle && (
            <Heading as="h3" size="sm" mb={2}>
              {label}
            </Heading>
          )}
          <Box
            role="group"
            borderRadius="md"
            position="relative"
            cursor={canOpenEdit ? 'pointer' : undefined}
            _hover={
              canOpenEdit
                ? {
                    _before: {
                      content: '""',
                      display: 'block',
                      borderRadius: 'md',
                      position: 'absolute',
                      left: '-8px',
                      top: '-4px',
                      zIndex: -1,
                      w: 'calc(100% + 16px)',
                      h: 'calc(100% + 8px)',
                      ...hoverStyle,
                    },
                  }
                : undefined
            }
            onClick={canOpenEdit ? () => setIsEditing(true) : undefined}
          >
            <SimpleEditor
              ref={editorRef}
              value={value}
              placeholder={placeholder}
              readOnly={!isEditing}
              autoFocus={isEditing}
              onSubmit={handleSubmit}
            />

            {canOpenEdit && (
              <Icon
                as={FiEdit3}
                position="absolute"
                top="2px"
                right="-2px"
                display="none"
                _groupHover={{ display: 'block' }}
              />
            )}
          </Box>
          {isEditing && (
            <Box textAlign="right">
              <Button size="sm" mt={2} onClick={handleCancel}>
                {t('common.cancel')}
              </Button>
              <Button
                colorScheme="blue"
                size="sm"
                mt={2}
                ml={2}
                onClick={handleSubmit}
              >
                {t('common.save')}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
