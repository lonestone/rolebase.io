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
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import useCurrentMember from '@hooks/useCurrentMember'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useState } from 'react'

enum ExportType {
  Org = 'Org',
  CurrentMember = 'CurrentMember',
  Circle = 'Circle',
}

export default function MeetingExportModal(modalProps: UseModalProps) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const member = useCurrentMember()

  const [exportType, setExportType] = useState<ExportType>(
    ExportType.CurrentMember
  )
  const [circleId, setCircleId] = useState<string | undefined>()
  const [url, setUrl] = useState<string>('')

  // Update url when export type changes
  useEffect(() => {
    if (!orgId) return
    setUrl('')
    switch (exportType) {
      case ExportType.Org:
        getMeetingsIcalUrl(orgId).then(setUrl)
        break
      case ExportType.CurrentMember:
        getMeetingsIcalUrl(orgId, member?.id).then(setUrl)
        break
      case ExportType.Circle:
        if (circleId) {
          getMeetingsIcalUrl(orgId, undefined, circleId).then(setUrl)
        }
        break
    }
  }, [exportType, orgId, member?.id, circleId])

  // URL copy
  const { hasCopied, onCopy } = useClipboard(url)
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
                <EntityButtonCombobox
                  circles
                  circlesSingleMember={false}
                  value={circleId}
                  onChange={setCircleId}
                />
              </FormControl>
            )}

            {url && (
              <FormControl>
                <FormLabel>URL iCal</FormLabel>
                <InputGroup>
                  <Input
                    autoFocus
                    value={url}
                    readOnly
                    flex={1}
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
