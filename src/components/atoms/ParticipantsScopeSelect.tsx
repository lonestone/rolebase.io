import { Select, SelectProps } from '@chakra-ui/react'
import { Member_Scope_Enum } from '@gql'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

const ParticipantsScopeSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (selectProps, ref) => {
    const { t } = useTranslation()

    return (
      <Select ref={ref} {...selectProps}>
        <option value={Member_Scope_Enum.Organization}>
          {t('ParticipantsScopeSelect.Organization')}
        </option>
        <option value={Member_Scope_Enum.CircleLeaders}>
          {t('ParticipantsScopeSelect.CircleLeaders')}
        </option>
        <option value={Member_Scope_Enum.CircleMembers}>
          {t('ParticipantsScopeSelect.CircleMembers')}
        </option>
        <option value={Member_Scope_Enum.None}>
          {t('ParticipantsScopeSelect.None')}
        </option>
      </Select>
    )
  }
)

ParticipantsScopeSelect.displayName = 'ParticipantsScopeSelect'

export default ParticipantsScopeSelect
