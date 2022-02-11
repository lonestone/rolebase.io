import CircleMemberChakraLink from '@components/atoms/CircleMemberChakraLink'
import MemberLink from '@components/atoms/MemberLink'
import { LogEntry, LogType } from '@shared/log'
import React from 'react'

interface Props {
  log: LogEntry
}

export default function LogText({ log }: Props) {
  switch (log.display.type) {
    case LogType.CircleCreate:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          créé le cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
        </>
      )

    case LogType.CircleMove:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          déplacé le cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
          {log.display.parentId && log.display.parentName && (
            <>
              {' '}
              dans{' '}
              <CircleMemberChakraLink
                circleId={log.display.parentId}
                fontWeight={700}
                textDecoration="none"
              >
                {log.display.parentName}
              </CircleMemberChakraLink>
            </>
          )}
        </>
      )

    case LogType.CircleCopy:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          copié le cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
          {log.display.parentId && log.display.parentName && (
            <>
              {' '}
              dans{' '}
              <CircleMemberChakraLink
                circleId={log.display.parentId}
                fontWeight={700}
                textDecoration="none"
              >
                {log.display.parentName}
              </CircleMemberChakraLink>
            </>
          )}
        </>
      )

    case LogType.CircleArchive:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          archivé le cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
        </>
      )

    case LogType.CircleMemberAdd:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          ajouté{' '}
          <MemberLink
            member={{ id: log.display.memberId, name: log.display.memberName }}
          />{' '}
          au cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
        </>
      )

    case LogType.CircleMemberRemove:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          supprimé{' '}
          <MemberLink
            member={{ id: log.display.memberId, name: log.display.memberName }}
          />{' '}
          du cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
        </>
      )

    case LogType.CircleMemberMove:
      return (
        <>
          <MemberLink member={{ id: log.memberId, name: log.memberName }} /> a
          déplacé{' '}
          <MemberLink
            member={{ id: log.display.memberId, name: log.display.memberName }}
          />{' '}
          dans le cercle{' '}
          <CircleMemberChakraLink
            circleId={log.display.id}
            fontWeight={700}
            textDecoration="none"
          >
            {log.display.name}
          </CircleMemberChakraLink>
        </>
      )

    case LogType.RoleUpdate:
      return <></>
  }
}
