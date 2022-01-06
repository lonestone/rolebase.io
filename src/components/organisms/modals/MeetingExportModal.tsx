import { getMeetingsIcalUrl } from '@api/entities/meetings'
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React from 'react'

export default function MeetingExportModal(modalProps: UseModalProps) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const url = getMeetingsIcalUrl(orgId)

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Exporter l'agenda des Réunions</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={10}>
          <FormControl>
            <FormLabel>URL iCal</FormLabel>
            <Input
              autoFocus
              value={url}
              readOnly
              onFocus={(e) => e.target.select()}
            />
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
