import { cancelLog, detectEntitiesLogChanges } from '@api/entities/logs'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  UseModalProps,
  useToast,
} from '@chakra-ui/react'
import LogCancelText from '@components/molecules/LogCancelText'
import LogText from '@components/molecules/LogText'
import { useAsyncMemo } from '@hooks/useAsyncMemo'
import useCreateLog from '@hooks/useCreateLog'
import { LogEntry } from '@shared/log'
import React, { useState } from 'react'

interface Props extends UseModalProps {
  log: LogEntry
}

export default function LogCancelModal({ log, ...modalProps }: Props) {
  const { colorMode } = useColorMode()
  const toast = useToast()
  const createLog = useCreateLog()

  // Detect changes in logged updated entities since the log
  const hadChanges = useAsyncMemo(
    () => detectEntitiesLogChanges(log.changes),
    [log],
    false
  )

  // Checkbox to force cancel if there are changes
  const [force, setForce] = useState(false)

  // Cancel log
  const handleCancelLog = async () => {
    modalProps.onClose()

    // Revert changes
    const changes = await cancelLog(log)

    // Log cancelation
    createLog({
      meetingId: log.meetingId || null,
      display: log.display,
      changes,
      ...(!log.cancelLogId
        ? {
            cancelLogId: log.id,
            cancelMemberId: log.memberId,
            cancelMemberName: log.memberName,
          }
        : {}),
    })

    toast({
      title: 'Action annulée',
      status: 'success',
      duration: 2000,
    })
  }

  return (
    <Modal returnFocusOnClose={false} size="lg" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Annuler une action</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box
            p={3}
            borderRadius="md"
            border="1px solid"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
            borderColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
          >
            <LogCancelText log={log} />
            <LogText log={log} />
          </Box>

          {hadChanges && (
            <FormControl mt={5}>
              <Alert status="warning" mb={5}>
                <AlertIcon />
                <AlertDescription>
                  Des données ont changé depuis cette action. Vous risquez de
                  perdre des modifications plus récentes si vous annulez cette
                  action.
                </AlertDescription>
              </Alert>
              <Checkbox isChecked={force} onChange={() => setForce((f) => !f)}>
                Je comprends que je peux perdre des modifications
              </Checkbox>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            type="submit"
            isDisabled={hadChanges && !force}
            onClick={handleCancelLog}
          >
            Annuler cette action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
