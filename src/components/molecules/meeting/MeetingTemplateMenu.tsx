import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { useSubscribeMeetingTemplatesSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import MeetingTemplateListModal from '@organisms/meeting/MeetingTemplateListModal'
import { MeetingTemplateEntry } from '@shared/model/meeting_template'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiEdit3, FiFileText } from 'react-icons/fi'

interface Props {
  onSelect: (template: MeetingTemplateEntry) => void
}

export default function MeetingTemplateMenu({ onSelect }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to templates
  const { data } = useSubscribeMeetingTemplatesSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const meetingTemplates = data?.meeting_template as
    | MeetingTemplateEntry[]
    | undefined

  // Meeting templates modal
  const modal = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          variant="link"
          rightIcon={<FiChevronDown />}
        >
          {t('MeetingTemplateMenu.menu')}
        </MenuButton>
        <MenuList>
          {meetingTemplates?.map((template) => (
            <MenuItem
              key={template.id}
              icon={<FiFileText />}
              onClick={() => onSelect(template)}
            >
              {template.title}
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem icon={<FiEdit3 />} onClick={modal.onOpen}>
            {t('MeetingTemplateMenu.edit')}
          </MenuItem>
        </MenuList>
      </Menu>

      {modal.isOpen && (
        <MeetingTemplateListModal isOpen onClose={modal.onClose} />
      )}
    </>
  )
}
