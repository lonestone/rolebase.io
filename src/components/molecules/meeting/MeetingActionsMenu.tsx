import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateMeetingMutation } from '@gql'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiCopy,
  FiEdit3,
  FiMoreVertical,
  FiPlay,
  FiSettings,
  FiTrash2,
} from 'react-icons/fi'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  onEdit(): void
  onDuplicate(): void
}

export default function MeetingActionsMenu({
  onEdit,
  onDuplicate,
  ...buttonProps
}: Props) {
  const { t } = useTranslation()
  const [updateMeeting] = useUpdateMeetingMutation()

  const {
    meeting,
    canEdit,
    forceEdit,
    isStarted,
    isEnded,
    handleNextStep,
    handleChangeForceEdit,
  } = useContext(MeetingContext)!

  // Archive / unarchive
  const setArchive = (archived: boolean) => {
    if (!meeting) return
    updateMeeting({
      variables: { id: meeting.id, values: { archived } },
    })
  }
  const handleArchive = () => setArchive(true)
  const handleUnarchive = () => setArchive(false)

  if (!canEdit) return null

  return (
    <Menu isLazy>
      <MenuButton
        aria-label={t('ActionsMenu.label')}
        as={IconButton}
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
        {...buttonProps}
      />

      <MenuList
        fontFamily="body"
        fontSize="1rem"
        fontWeight="normal"
        shadow="lg"
        zIndex={1000}
      >
        <MenuItem icon={<FiSettings />} onClick={onEdit}>
          {t('MeetingActionsMenu.edit')}
        </MenuItem>

        {isEnded && !forceEdit && (
          <MenuItem
            icon={<FiEdit3 />}
            onClick={() => handleChangeForceEdit(true)}
          >
            {t('MeetingActionsMenu.forceEdit')}
          </MenuItem>
        )}

        {isEnded && (
          <MenuItem icon={<FiPlay />} onClick={handleNextStep}>
            {t('MeetingActionsMenu.restart')}
          </MenuItem>
        )}

        <MenuItem icon={<FiCopy />} onClick={onDuplicate}>
          {t('common.duplicate')}
        </MenuItem>

        {!meeting?.archived && !isStarted && (
          <MenuItem icon={<FiTrash2 />} onClick={handleArchive}>
            {t('common.archive')}
          </MenuItem>
        )}
        {meeting?.archived && (
          <MenuItem icon={<FiTrash2 />} onClick={handleUnarchive}>
            {t('common.unarchive')}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
