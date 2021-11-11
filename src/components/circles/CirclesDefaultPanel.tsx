import React from 'react'
import LinkButton from '../common/LinkButton'
import Panel from '../common/Panel'

export default function CirclesDefaultPanel() {
  return (
    <Panel>
      <LinkButton to="?baseRoles">Rôles de base</LinkButton>
      <LinkButton to="?vacantRoles" ml={2}>
        Rôles vacants
      </LinkButton>
    </Panel>
  )
}
