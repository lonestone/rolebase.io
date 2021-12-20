import { Select, SelectProps } from '@chakra-ui/react'
import { MembersScope } from '@shared/member'
import React, { forwardRef } from 'react'

const ParticipantsScopeSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (selectProps, ref) => {
    return (
      <Select ref={ref} {...selectProps}>
        <option value={MembersScope.Organization}>
          Tous les membres de l'Organisation
        </option>
        <option value={MembersScope.CircleLeaders}>
          Les membres Leaders de Rôles et de sous-Cercles
        </option>
        <option value={MembersScope.CircleMembers}>
          Tous les membres du Cercle et des sous-Cercles
        </option>
        <option value={MembersScope.None}>
          Seulement les membres invités (ci-dessous)
        </option>
      </Select>
    )
  }
)

export default ParticipantsScopeSelect
