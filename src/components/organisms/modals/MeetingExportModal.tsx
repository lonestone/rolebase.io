import { getMeetingsIcalUrl } from '@api/entities/meetings'
import {
  Button,
  FormControl,
  FormLabel,
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
  useClipboard,
  UseModalProps,
  useToast,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import useCallbackState from '@hooks/useCallbackState'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import React, { useEffect, useState } from 'react'

enum ExportType {
  Org = 'Org',
  CurrentMember = 'CurrentMember',
  Circle = 'Circle',
}

export default function MeetingExportModal(modalProps: UseModalProps) {
  const orgId = useOrgId()
  const member = useCurrentMember()

  const [exportType, setExportType] = useState<ExportType>(
    ExportType.CurrentMember
  )
  const [circleId, setCircleId] = useState<string | undefined>()

  const {
    call: update,
    value: url,
    loading,
    error,
  } = useCallbackState(async () => {
    if (!orgId) return
    switch (exportType) {
      case ExportType.Org:
        return getMeetingsIcalUrl(orgId)
      case ExportType.CurrentMember:
        return getMeetingsIcalUrl(orgId, member?.id)
      case ExportType.Circle:
        if (circleId) {
          return getMeetingsIcalUrl(orgId, undefined, circleId)
        }
    }
  })

  // Update url when export type changes
  useEffect(() => {
    update()
  }, [exportType, orgId, member?.id, circleId])

  // URL copy
  const { hasCopied, onCopy } = useClipboard(url || '')
  const toast = useToast()

  useEffect(() => {
    if (!hasCopied) return
    toast({
      title: 'URL copiée',
      status: 'info',
      duration: 1500,
    })
  }, [hasCopied])

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Exporter l'agenda des Réunions</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={10}>
          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel>Inclure</FormLabel>
              <Select
                value={exportType}
                onChange={(e) => setExportType(e.target.value as ExportType)}
              >
                <option value={ExportType.Org}>
                  Toutes les réunions de l'organisation
                </option>
                <option value={ExportType.CurrentMember}>
                  Toutes mes réunions
                </option>
                <option value={ExportType.Circle}>
                  Toutes les réunions d'un cercle
                </option>
              </Select>
            </FormControl>

            {exportType === ExportType.Circle && (
              <FormControl>
                <FormLabel>Cercle</FormLabel>
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
                <FormLabel>URL iCal</FormLabel>
                <InputGroup>
                  <Input
                    autoFocus
                    value={url}
                    readOnly
                    flex={1}
                    pr="4.7rem"
                    onFocus={(e) => e.target.select()}
                  />
                  <InputRightElement width="4.5rem" mr="0.1rem">
                    <Button size="sm" onClick={onCopy}>
                      Copier
                    </Button>
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
