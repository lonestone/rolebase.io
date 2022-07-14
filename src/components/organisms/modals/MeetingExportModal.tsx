import {
  getMeetingsIcalToken,
  getMeetingsIcalUrl,
} from '@api/entities/meetings'
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import useCallbackState from '@hooks/useCallbackState'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCopy } from 'react-icons/fi'
import useCopyUrl from './useCopyUrl'

enum ExportType {
  Org = 'Org',
  CurrentMember = 'CurrentMember',
  Circle = 'Circle',
}

export default function MeetingExportModal(modalProps: UseModalProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const orgId = useOrgId()
  const member = useCurrentMember()

  const [exportType, setExportType] = useState<ExportType>(
    ExportType.CurrentMember
  )
  const [circleId, setCircleId] = useState<string | undefined>()

  // Get token
  const {
    call: update,
    value: token,
    loading,
    error,
  } = useCallbackState(async () => {
    if (!orgId) return
    return getMeetingsIcalToken(orgId)
  })

  useEffect(() => {
    update()
  }, [orgId])

  // Get URL
  const url = useMemo(() => {
    if (!orgId || !token) return
    switch (exportType) {
      case ExportType.Org:
        return getMeetingsIcalUrl(orgId, token, language)
      case ExportType.CurrentMember:
        return getMeetingsIcalUrl(orgId, token, language, member?.id)
      case ExportType.Circle:
        if (circleId) {
          return getMeetingsIcalUrl(orgId, token, language, undefined, circleId)
        }
    }
  }, [orgId, token, language, member, circleId, exportType])

  // Copy URL
  const copyUrl = useCopyUrl(url)

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('organisms.modals.MeetingExportModal.heading')}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={10}>
          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel>
                {t('organisms.modals.MeetingExportModal.scope')}
              </FormLabel>
              <Select
                value={exportType}
                onChange={(e) => setExportType(e.target.value as ExportType)}
              >
                <option value={ExportType.Org}>
                  {t('organisms.modals.MeetingExportModal.scopeOrg')}
                </option>
                <option value={ExportType.CurrentMember}>
                  {t('organisms.modals.MeetingExportModal.scopeMine')}
                </option>
                <option value={ExportType.Circle}>
                  {t('organisms.modals.MeetingExportModal.scopeCircle')}
                </option>
              </Select>
            </FormControl>

            {exportType === ExportType.Circle && (
              <FormControl>
                <FormLabel>
                  {t('organisms.modals.MeetingExportModal.circle')}
                </FormLabel>
                <CircleSearchInput
                  singleMember={false}
                  value={circleId}
                  onChange={setCircleId}
                />
              </FormControl>
            )}

            <Loading size="sm" active={loading} />
            <TextErrors errors={[error]} />

            {url && (
              <FormControl>
                <FormLabel>
                  {t('organisms.modals.MeetingExportModal.url')}
                </FormLabel>
                <InputGroup>
                  <Input
                    autoFocus
                    value={url}
                    readOnly
                    flex={1}
                    pr="4.7rem"
                    onFocus={(e) => e.target.select()}
                  />
                  <InputRightElement>
                    <Tooltip label={t('common.copy')} placement="top" hasArrow>
                      <IconButton
                        aria-label={t('common.copy')}
                        icon={<FiCopy />}
                        onClick={copyUrl}
                      />
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
