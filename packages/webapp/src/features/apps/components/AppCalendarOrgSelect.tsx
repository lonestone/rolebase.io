import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { OrgCalendarConfig } from '@rolebase/shared/model/user_app'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import { CheckIcon, ChevronDownIcon } from 'src/icons'

interface Props extends Omit<MenuButtonProps, 'value' | 'onChange'> {
  calendarId: string
  orgCalendars: OrgCalendarConfig[]
  value: string | null // orgId
  onChange(calendarId: string, orgId: string | null): void
}

export default function AppCalendarOrgSelect({
  calendarId,
  orgCalendars,
  value,
  onChange,
  ...props
}: Props) {
  const { t } = useTranslation()
  const orgs = useStoreState((state) => state.orgs.entries)
  const valueOrg = orgs?.find((org) => org.id === value)

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        size="sm"
        variant={valueOrg ? 'solid' : 'outline'}
        colorScheme={valueOrg ? 'blue' : 'gray'}
        leftIcon={valueOrg ? <CheckIcon /> : undefined}
        rightIcon={<ChevronDownIcon size="1em" />}
        {...props}
      >
        {valueOrg ? valueOrg.name : t('AppCalendarOrgSelect.placeholder')}
      </MenuButton>

      <MenuList zIndex={10} shadow="lg">
        {valueOrg && (
          <MenuItem
            color="red.600"
            _dark={{ color: 'red.200' }}
            icon={<FiX size={16} />}
            onClick={() => onChange(calendarId, null)}
          >
            {t('AppCalendarOrgSelect.remove')}
          </MenuItem>
        )}
        {orgs?.map((org) => {
          return (
            <MenuItem key={org.id} onClick={() => onChange(calendarId, org.id)}>
              {org.name}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}
