import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import { EntityFilters } from '@shared/model/participants'
import React, { Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

const threadStatusOptions = [
  Thread_Status_Enum.Preparation,
  Thread_Status_Enum.Active,
  Thread_Status_Enum.Blocked,
  Thread_Status_Enum.Closed,
]

const entityFiltersOptions = [EntityFilters.Invited, EntityFilters.NotInvited]

export type Props = {
  filter: EntityFilters
  filterValue: EntityFilters[]
  handleFilterChange: (value: string | string[]) => void
  archives?: boolean
  setArchives: Dispatch<boolean>
  status?: Thread_Status_Enum[]
  setStatus: Dispatch<Thread_Status_Enum[]>
}

export const ThreadListSelect = ({
  filter,
  filterValue,
  handleFilterChange,
  archives,
  setArchives,
  status,
  setStatus,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        className="userflow-threads-filter"
        size="sm"
        variant="outline"
        rightIcon={<FiChevronDown />}
      >
        {t(`ThreadsPage.participation.${filter}` as any)}
      </MenuButton>
      <MenuList zIndex={2}>
        <MenuOptionGroup
          title={t('ThreadsPage.participation.title')}
          type="checkbox"
          value={filterValue}
          onChange={handleFilterChange}
        >
          {entityFiltersOptions.map((option) => (
            <MenuItemOption key={option} value={option}>
              {t(`ThreadsPage.participation.${option}`)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

        <MenuDivider />

        <MenuOptionGroup
          title={t('ThreadsPage.status.title')}
          type="checkbox"
          value={status}
          onChange={(value) => setStatus(value as Thread_Status_Enum[])}
        >
          {threadStatusOptions.map((option) => (
            <MenuItemOption key={option} value={option}>
              {t(`common.threadStatus.${option}`)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

        <MenuDivider />

        <MenuOptionGroup
          title={t('ThreadsPage.archives.title')}
          type="checkbox"
          value={archives ? ['archives'] : []}
          onChange={(value) => setArchives(value.includes('archives'))}
        >
          <MenuItemOption value="archives">
            {t('ThreadsPage.archives.show')}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
