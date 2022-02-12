import CircleMemberChakraLink from '@components/atoms/CircleMemberChakraLink'
import MemberLink from '@components/atoms/MemberLink'
import RoleEditLink from '@components/atoms/RoleEditLink'
import { LogEntry, LogType } from '@shared/log'
import React from 'react'

interface Props {
  log: LogEntry
}

export default function LogText({ log }: Props) {
  const memberId = log.cancelMemberId || log.memberId
  const memberName = log.cancelMemberName || log.memberName

  switch (log.display.type) {
    case LogType.CircleCreate:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> a créé le cercle{' '}
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

    case LogType.CircleMove:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> a déplacé le cercle{' '}
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
          <MemberLink id={memberId} name={memberName} /> a copié le cercle{' '}
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
          <MemberLink id={memberId} name={memberName} /> a archivé le cercle{' '}
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
          <MemberLink id={memberId} name={memberName} /> a ajouté{' '}
          <MemberLink id={log.display.memberId} name={log.display.memberName} />{' '}
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
          <MemberLink id={memberId} name={memberName} /> a supprimé{' '}
          <MemberLink id={log.display.memberId} name={log.display.memberName} />{' '}
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
          <MemberLink id={memberId} name={memberName} /> a déplacé{' '}
          <MemberLink id={log.display.memberId} name={log.display.memberName} />{' '}
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
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> a modifié le rôle{' '}
          <RoleEditLink id={log.display.id} name={log.display.name} />{' '}
        </>
      )
  }
}
