import { getMeetingsIcalUrl, getMeetingsToken } from '@api/functions'
import IconTextButton from '@atoms/IconTextButton'
import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import useCallbackState from '@hooks/useCallbackState'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import React, { useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'
import { CopyIcon } from 'src/icons'
import useCopyUrl from '../../../hooks/useCopyUrl'

export default function MeetingExportModal(modalProps: UseModalProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const orgId = useOrgId()
  const member = useCurrentMember()

  // Get token
  const {
    call: update,
    value: token,
    loading,
    error,
  } = useCallbackState(async () => {
    if (!orgId) return
    return getMeetingsToken({ orgId })
  })

  useEffect(() => {
    update()
  }, [orgId])

  // Get URL
  const url = useMemo(() => {
    if (!orgId || !member || !token) return
    return getMeetingsIcalUrl(orgId, token, language, member.id)
  }, [orgId, token, language, member])

  // Copy URL
  const copyUrl = useCopyUrl(url)

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('MeetingExportModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={10}>
          <VStack spacing={5} align="stretch">
            <Loading size="sm" active={loading} />
            <TextErrors errors={[error]} />

            {url && (
              <FormControl>
                <FormLabel>{t('MeetingExportModal.url')}</FormLabel>
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
                    <IconTextButton
                      className="userflow-copy-url"
                      aria-label={t('common.copy')}
                      icon={<CopyIcon size={20} />}
                      onClick={copyUrl}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}

            <Alert status="info">
              <AlertIcon />
              <AlertDescription>
                <Trans
                  i18nKey="MeetingExportModal.help"
                  components={{
                    apps: (
                      <Link
                        as={ReachLink}
                        to="/apps"
                        textDecoration="underline"
                      />
                    ),
                  }}
                />
              </AlertDescription>
            </Alert>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
