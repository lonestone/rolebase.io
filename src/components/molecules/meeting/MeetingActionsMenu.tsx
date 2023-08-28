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
  ArchiveIcon,
  CopyIcon,
  EditIcon,
  MoreIcon,
  PlayIcon,
  RestoreIcon,
  SettingsIcon,
} from 'src/icons'

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
        icon={<MoreIcon size={20} />}
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
        <MenuItem icon={<SettingsIcon size={20} />} onClick={onEdit}>
          {t('MeetingActionsMenu.edit')}
        </MenuItem>

        {isEnded && !forceEdit && (
          <MenuItem
            icon={<EditIcon size={20} />}
            onClick={() => handleChangeForceEdit(true)}
          >
            {t('MeetingActionsMenu.forceEdit')}
          </MenuItem>
        )}

        {isEnded && (
          <MenuItem icon={<PlayIcon size={20} />} onClick={handleNextStep}>
            {t('MeetingActionsMenu.restart')}
          </MenuItem>
        )}

        <MenuItem icon={<CopyIcon size={20} />} onClick={onDuplicate}>
          {t('common.duplicate')}
        </MenuItem>

        {!meeting?.archived && !isStarted && (
          <MenuItem icon={<ArchiveIcon size={20} />} onClick={handleArchive}>
            {t('common.archive')}
          </MenuItem>
        )}
        {meeting?.archived && (
          <MenuItem icon={<RestoreIcon size={20} />} onClick={handleUnarchive}>
            {t('common.unarchive')}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
