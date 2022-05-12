import { Select, SelectProps } from '@chakra-ui/react'
import { MembersScope } from '@shared/model/member'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

const ParticipantsScopeSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (selectProps, ref) => {
    const { t } = useTranslation()

    return (
      <Select ref={ref} {...selectProps}>
        <option value={MembersScope.Organization}>
          {t('atoms.ParticipantsScopeSelect.Organization')}
        </option>
        <option value={MembersScope.CircleLeaders}>
          {t('atoms.ParticipantsScopeSelect.CircleLeaders')}
        </option>
        <option value={MembersScope.CircleMembers}>
          {t('atoms.ParticipantsScopeSelect.CircleMembers')}
        </option>
        <option value={MembersScope.None}>
          {t('atoms.ParticipantsScopeSelect.None')}
        </option>
      </Select>
    )
  }
)

ParticipantsScopeSelect.displayName = 'ParticipantsScopeSelect'

export default ParticipantsScopeSelect
