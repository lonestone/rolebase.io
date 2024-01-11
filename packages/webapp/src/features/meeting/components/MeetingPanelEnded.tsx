import IconTextButton from '@/common/atoms/IconTextButton'
import Markdown from '@/common/atoms/Markdown'
import { EditorHandle } from '@/editor'
import CollabEditor from '@/editor/components/CollabEditor'
import { generateMeetingSummary } from '@api/functions'
import {
  Box,
  Button,
  Collapse,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useUpdateMeetingMutation } from '@gql'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon, ChevronUpIcon, MagicIcon } from 'src/icons'
import { MeetingContext } from '../contexts/MeetingContext'

export default function MeetingPanelEnded() {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const toast = useToast()
  const showPanel = useDisclosure({ defaultIsOpen: true })
  const editorRef = useRef<EditorHandle>(null)

  const { meeting, canEdit, isEnded } = useContext(MeetingContext)!

  const [updateMeeting] = useUpdateMeetingMutation()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generatedSummary, setGeneratedSummary] = useState<string | undefined>()

  const handleSave = async () => {
    if (!editorRef.current) return

    const value = editorRef.current.getValue()
    if (meeting?.summary === value) return
    setSaving(true)

    await updateMeeting({
      variables: {
        id: meeting!.id,
        values: { summary: value },
      },
    })
  }

  const handleGenerate = () => {
    if (!meeting) return

    // Use generated summary we already have it
    if (generatedSummary) {
      editorRef.current?.setValue(generatedSummary)
      return
    }

    // Generate new summary
    setGenerating(true)
    generateMeetingSummary({ meetingId: meeting.id, lang: language })
      .then((summary) => {
        editorRef.current?.setValue(summary)
        setGeneratedSummary(summary)
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: t('common.error'),
          status: 'error',
          duration: 3000,
        })
      })
      .finally(() => setGenerating(false))
  }

  useEffect(() => {
    setEditing(canEdit && !meeting?.summary)
    setSaving(false)
  }, [meeting, canEdit])

  if (!meeting || !isEnded || (!canEdit && !meeting.summary)) {
    return null
  }

  return (
    <Container maxW="3xl" py={5}>
      <IconTextButton
        aria-label={
          showPanel.isOpen
            ? t('common.hide')
            : t('MeetingPanelEnded.headingRead')
        }
        icon={
          showPanel.isOpen ? (
            <ChevronDownIcon size="1em" />
          ) : (
            <ChevronUpIcon size="1em" />
          )
        }
        showText={!showPanel.isOpen}
        variant="ghost"
        position="absolute"
        top={0}
        right={0}
        onClick={showPanel.onToggle}
      />

      <Collapse in={showPanel.isOpen}>
        <VStack spacing={3} align="stretch">
          <HStack spacing={5}>
            <Heading as="h2" size="md">
              {editing
                ? t('MeetingPanelEnded.headingWrite')
                : t('MeetingPanelEnded.headingRead')}
            </Heading>
            {!editing && canEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(true)}
              >
                {t('common.edit')}
              </Button>
            )}
          </HStack>

          {editing ? (
            <>
              <Text color="gray.500" _dark={{ color: 'gray.300' }}>
                {t('MeetingPanelEnded.info')}
              </Text>

              <CollabEditor
                ref={editorRef}
                docId={`meeting-${meeting.id}-summary`}
                value={meeting.summary}
                autoFocus
                minH="6em"
              />

              <HStack justifyContent="end">
                {meeting.summary && (
                  <Button
                    variant="ghost"
                    isDisabled={saving || generating}
                    onClick={() => setEditing(false)}
                  >
                    {t('common.cancel')}
                  </Button>
                )}
                <Button
                  leftIcon={<MagicIcon />}
                  isDisabled={saving}
                  isLoading={generating}
                  onClick={handleGenerate}
                >
                  {t('MeetingPanelEnded.generate')}
                </Button>
                <Button
                  colorScheme="blue"
                  isLoading={saving}
                  isDisabled={generating}
                  onClick={handleSave}
                >
                  {t('common.save')}
                </Button>
              </HStack>
            </>
          ) : (
            <Box mb={3}>
              <Markdown>{meeting.summary}</Markdown>
            </Box>
          )}
        </VStack>
      </Collapse>
    </Container>
  )
}
