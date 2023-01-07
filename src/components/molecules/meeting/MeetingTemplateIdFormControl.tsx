import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import {
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import { useSubscribeMeetingTemplatesSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import MeetingTemplateListModal from '@organisms/meeting/MeetingTemplateListModal'
import { MeetingTemplateEntry } from '@shared/model/meeting_template'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiEdit3 } from 'react-icons/fi'

interface Props {
  onSelect?: (template: MeetingTemplateEntry) => void
}

export default function MeetingTemplateIdFormControl({ onSelect }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const {
    control,
    formState: { errors },
  } = useFormContext()

  // Subscribe to templates
  const {
    data,
    loading: meetingTemplatesLoading,
    error: meetingTemplatesError,
  } = useSubscribeMeetingTemplatesSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const meetingTemplates = data?.meeting_template as
    | MeetingTemplateEntry[]
    | undefined

  // Meeting templates modal
  const modal = useDisclosure()

  return (
    <FormControl isInvalid={!!errors.templateId}>
      <FormLabel>{t('MeetingTemplateIdFormControl.template')}</FormLabel>

      {meetingTemplatesLoading && <Loading active size="md" />}
      <TextErrors errors={[meetingTemplatesError]} />

      <HStack spacing={2}>
        <Controller
          name="templateId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value as number}
              onChange={(event) => {
                field.onChange(event)
                if (onSelect) {
                  const template = meetingTemplates?.find(
                    (mt) => mt.id === event.target.value
                  )
                  if (template) onSelect(template)
                }
              }}
            >
              <option value="" />
              {meetingTemplates?.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </Select>
          )}
        />

        <IconButton
          aria-label={t('common.edit')}
          icon={<FiEdit3 />}
          onClick={modal.onOpen}
        />
      </HStack>

      {modal.isOpen && (
        <MeetingTemplateListModal isOpen onClose={modal.onClose} />
      )}
    </FormControl>
  )
}
