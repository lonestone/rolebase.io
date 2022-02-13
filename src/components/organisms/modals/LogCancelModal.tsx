import { cancelLog, detectRecentEntitiesChanges } from '@api/entities/logs'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Collapse,
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
  VStack,
} from '@chakra-ui/react'
import LogCancelText from '@components/molecules/LogCancelText'
import LogEntityChanges from '@components/molecules/LogEntityChanges'
import LogText from '@components/molecules/LogText'
import { useAsyncMemo } from '@hooks/useAsyncMemo'
import useCreateLog from '@hooks/useCreateLog'
import { EntitiesChanges, EntityChange, LogEntry } from '@shared/log'
import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Props extends UseModalProps {
  log: LogEntry
}

export default function LogCancelModal({ log, ...modalProps }: Props) {
  const { colorMode } = useColorMode()
  const toast = useToast()
  const createLog = useCreateLog()

  // Detect changes in logged updated entities since the log
  const hadChanges = useAsyncMemo(
    () => detectRecentEntitiesChanges(log.changes),
    [log],
    false
  )

  // Show details
  const [showDetails, setShowDetails] = useState(false)

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
          <VStack spacing={4} alignItems="start">
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
              <>
                <Alert status="warning" mb={5}>
                  <AlertIcon />
                  <AlertDescription>
                    Des données ont changé depuis cette action. Vous risquez de
                    perdre des modifications plus récentes si vous annulez cette
                    action.
                  </AlertDescription>
                </Alert>
                <Checkbox
                  isChecked={force}
                  onChange={() => setForce((f) => !f)}
                >
                  Je comprends que je peux perdre des modifications
                </Checkbox>
              </>
            )}

            <Button
              variant="link"
              rightIcon={showDetails ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => setShowDetails((s) => !s)}
            >
              Voir les modifications
            </Button>
            <Collapse in={showDetails} animateOpacity>
              <VStack spacing={3}>
                {Object.keys(log.changes).flatMap((entityType) =>
                  log.changes[entityType as keyof EntitiesChanges]?.map(
                    (entityChange) => (
                      <LogEntityChanges
                        key={entityChange.id}
                        type={entityType}
                        entityChange={entityChange as EntityChange<any>}
                      />
                    )
                  )
                )}
              </VStack>
            </Collapse>
          </VStack>
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
