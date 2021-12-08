import LinkButton from '@components/atoms/LinkButton'
import Panel from '@components/atoms/Panel'
import React from 'react'

export default function CirclesDefaultPanel() {
  return (
    <Panel w="auto">
      <LinkButton to="?baseRoles">Rôles de base</LinkButton>
      <LinkButton to="?vacantRoles" ml={2}>
        Rôles vacants
      </LinkButton>
    </Panel>
  )
}
