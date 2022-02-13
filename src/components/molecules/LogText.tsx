import CircleLink from '@components/atoms/CircleLink'
import MemberLink from '@components/atoms/MemberLink'
import RoleEditLink from '@components/atoms/RoleEditLink'
import { LogEntry, LogType } from '@shared/log'
import React from 'react'

interface Props {
  log: LogEntry
}

const texts = {
  [LogType.CircleCreate]: 'a créé le cercle',
  [LogType.CircleCreate + 1]: 'dans',
  [LogType.CircleMove]: 'a déplacé le cercle',
  [LogType.CircleMove + 1]: 'dans',
  [LogType.CircleCopy]: 'a copié le cercle',
  [LogType.CircleCopy + 1]: 'dans',
  [LogType.CircleArchive]: 'a archivé le cercle',
  [LogType.CircleMemberAdd]: 'a ajouté',
  [LogType.CircleMemberAdd + 1]: 'au cercle',
  [LogType.CircleMemberRemove]: 'a retiré',
  [LogType.CircleMemberRemove + 1]: 'du cercle',
  [LogType.CircleMemberMove]: 'a déplacé',
  [LogType.CircleMemberMove + 1]: 'dans le cercle',
  [LogType.RoleCreate]: 'a créé le rôle',
  [LogType.RoleUpdate]: 'a modifié le rôle',
  [LogType.RoleArchive]: 'a archivé le rôle',
  [LogType.MemberCreate]: 'a créé le membre',
  [LogType.MemberUpdate]: 'a modifié le membre',
  [LogType.MemberArchive]: 'a archivé le membre',
}

export default function LogText({ log }: Props) {
  const memberId = log.cancelMemberId || log.memberId
  const memberName = log.cancelMemberName || log.memberName
  const type = log.display.type

  switch (type) {
    case LogType.CircleCreate:
    case LogType.CircleMove:
    case LogType.CircleCopy:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> {texts[type]}{' '}
          <CircleLink id={log.display.id} name={log.display.name} />
          {log.display.parentId && log.display.parentName && (
            <>
              {' '}
              {texts[type + 1]}{' '}
              <CircleLink
                id={log.display.parentId}
                name={log.display.parentName}
              />
            </>
          )}
        </>
      )

    case LogType.CircleArchive:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> {texts[type]}{' '}
          <CircleLink id={log.display.id} name={log.display.name} />
        </>
      )

    case LogType.CircleMemberAdd:
    case LogType.CircleMemberRemove:
    case LogType.CircleMemberMove:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> {texts[type]}{' '}
          <MemberLink id={log.display.memberId} name={log.display.memberName} />{' '}
          {texts[type + 1]}{' '}
          <CircleLink id={log.display.id} name={log.display.name} />
        </>
      )

    case LogType.RoleCreate:
    case LogType.RoleUpdate:
    case LogType.RoleArchive:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> {texts[type]}{' '}
          <RoleEditLink id={log.display.id} name={log.display.name} />
        </>
      )

    case LogType.MemberCreate:
    case LogType.MemberUpdate:
    case LogType.MemberArchive:
      return (
        <>
          <MemberLink id={memberId} name={memberName} /> {texts[type]}{' '}
          <MemberLink id={log.display.id} name={log.display.name} />
        </>
      )
  }
}
