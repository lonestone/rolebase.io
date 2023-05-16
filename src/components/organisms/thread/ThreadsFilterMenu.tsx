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
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

const entityFiltersList = [EntityFilters.Invited, EntityFilters.NotInvited]

const threadStatusFiltersList = [
  Thread_Status_Enum.Active,
  Thread_Status_Enum.Blocked,
  Thread_Status_Enum.Closed,
  Thread_Status_Enum.Preparation,
]

export type Props = {
  filter: EntityFilters
  filterValue: EntityFilters[]
  handleFilterChange: (value: string[] | string) => void
  archives: boolean
  setArchives: (value: boolean) => void
  status: Thread_Status_Enum[]
  setStatus: (value: Thread_Status_Enum[]) => void
}

export const ThreadsFilterMenu = ({
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
        {t(`ThreadsFilterMenu.participation.${filter}`)}
      </MenuButton>
      <MenuList zIndex={2}>
        <MenuOptionGroup
          title={t('ThreadsFilterMenu.participation.title')}
          type="checkbox"
          value={filterValue}
          onChange={(value) => handleFilterChange(value)}
        >
          {entityFiltersList.map((filter) => (
            <MenuItemOption key={filter} value={filter}>
              {t(`ThreadsFilterMenu.participation.${filter}`)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

        <MenuDivider />

        <MenuOptionGroup
          title={t('ThreadsFilterMenu.status.title')}
          type="checkbox"
          value={status}
          onChange={(value) => setStatus(value as Thread_Status_Enum[])}
        >
          {threadStatusFiltersList.map((filter) => (
            <MenuItemOption key={filter} value={filter}>
              {t(`common.threadStatus.${filter}`)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

        <MenuDivider />

        <MenuOptionGroup
          title={t('ThreadsFilterMenu.archives.title')}
          type="checkbox"
          value={archives ? ['archives'] : []}
          onChange={(value) => setArchives(value.includes('archives'))}
        >
          <MenuItemOption value="archives">
            {t('ThreadsFilterMenu.archives.show')}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
