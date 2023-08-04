import CircleButton from '@atoms/CircleButton'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Tag,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import useOrgMember from '@hooks/useOrgMember'
import MeetingActionsMenu from '@molecules/meeting/MeetingActionsMenu'
import MeetingDate from '@molecules/meeting/MeetingDate'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCalendar } from 'react-icons/fi'
import MeetingEditModal from '../../organisms/meeting/MeetingEditModal'

interface Props {
  headerIcons?: React.ReactNode
}

export default function MeetingHeader({ headerIcons }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  const { meeting, circle, participants, isStarted } =
    useContext(MeetingContext)!

  // Meeting edition modal
  const [duplicateInModal, setDuplicateInModal] = useState(false)

  const editModal = useDisclosure()

  const handleEdit = () => {
    if (!isMember) return
    setDuplicateInModal(false)
    editModal.onOpen()
  }

  const handleDuplicate = () => {
    if (!isMember) return
    setDuplicateInModal(true)
    editModal.onOpen()
  }

  return (
    <Box w="100%">
      <Flex w="100%">
        <Wrap spacing={2} flex={1} align="center">
          <HStack spacing={2}>
            <Icon as={FiCalendar} />
            <Heading as="h1" size="md">
              <Link href="#" onClick={editModal.onOpen}>
                {t('MeetingHeader.heading', {
                  title: meeting?.title || '…',
                })}
              </Link>
            </Heading>
          </HStack>

          <Spacer />

          <HStack spacing={2}>
            {meeting?.archived && <Tag>{t('common.archived')}</Tag>}

            {circle && <CircleButton circle={circle} />}

            <Box>
              <ParticipantsNumber participants={participants} />
            </Box>
          </HStack>
        </Wrap>

        <Flex mr={headerIcons ? -2 : 0}>
          <MeetingActionsMenu
            ml={2}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
          />

          {headerIcons}
        </Flex>
      </Flex>

      {meeting && (
        <Wrap spacing={5} align="center" fontSize="sm" ml={6}>
          <Link href="#" onClick={editModal.onOpen}>
            <MeetingDate meeting={meeting} />
          </Link>

          {meeting?.ended ? (
            <Tag ml={1}>{t('MeetingHeader.ended')}</Tag>
          ) : (
            isStarted && (
              <Tag colorScheme="green" ml={1}>
                {t('MeetingHeader.started')}
              </Tag>
            )
          )}
        </Wrap>
      )}

      {editModal.isOpen && (
        <MeetingEditModal
          meeting={meeting}
          duplicate={duplicateInModal}
          isOpen
          onClose={editModal.onClose}
        />
      )}
    </Box>
  )
}
