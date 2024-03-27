import CircleLink from '@/circle/components/CircleLink'
import DecisionLink from '@/decision/components/DecisionLink'
import MemberLink from '@/member/components/MemberLink'
import RoleEditLink from '@/role/components/RoleEditLink'
import TaskLink from '@/task/components/TaskLink'
import TaskStatusTag from '@/task/components/TaskStatusTag'
import ThreadLink from '@/thread/components/ThreadLink'
import ThreadStatusTag from '@/thread/components/ThreadStatusTag'
import { LogFragment } from '@gql'
import { LogType } from '@rolebase/shared/model/log'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props {
  log: LogFragment
}

export default function LogText({ log }: Props) {
  const { t } = useTranslation()
  const memberId = log.cancelMemberId || log.memberId
  const memberName = log.cancelMemberName || log.memberName
  const type = log.display.type
  const i18nPrefix = 'LogText'

  const author = <MemberLink id={memberId} name={memberName} />

  switch (type) {
    case LogType.CircleCreate:
    case LogType.CircleMove:
    case LogType.CircleCopy:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            circle: <CircleLink id={log.display.id} name={log.display.name} />,
            parentCircle:
              log.display.parentId && log.display.parentName ? (
                <CircleLink
                  id={log.display.parentId}
                  name={log.display.parentName}
                />
              ) : (
                <>{t(`${i18nPrefix}.circleRoot`)}</>
              ),
          }}
        />
      )

    case LogType.CircleArchive:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            circle: <CircleLink id={log.display.id} name={log.display.name} />,
          }}
        />
      )

    case LogType.CircleMemberAdd:
    case LogType.CircleMemberRemove:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            member: (
              <MemberLink
                id={log.display.memberId}
                name={log.display.memberName}
              />
            ),
            circle: <CircleLink id={log.display.id} name={log.display.name} />,
          }}
        />
      )

    case LogType.RoleCreate:
    case LogType.RoleUpdate:
    case LogType.RoleArchive:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            role: <RoleEditLink id={log.display.id} name={log.display.name} />,
          }}
        />
      )

    case LogType.MemberCreate:
    case LogType.MemberUpdate:
    case LogType.MemberArchive:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            member: <MemberLink id={log.display.id} name={log.display.name} />,
          }}
        />
      )

    case LogType.TaskCreate:
    case LogType.TaskUpdate:
    case LogType.TaskArchive:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            task: <TaskLink id={log.display.id} name={log.display.name} />,
          }}
        />
      )

    case LogType.TaskStatusUpdate:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            task: <TaskLink id={log.display.id} name={log.display.name} />,
            status: <TaskStatusTag status={log.display.status} />,
          }}
        />
      )

    case LogType.ThreadStatusUpdate:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            task: <ThreadLink id={log.display.id} name={log.display.name} />,
            prevStatus: <ThreadStatusTag status={log.display.prevStatus} />,
            status: <ThreadStatusTag status={log.display.status} />,
          }}
        />
      )

    case LogType.DecisionCreate:
    case LogType.DecisionUpdate:
    case LogType.DecisionArchive:
      return (
        <Trans
          i18nKey={`${i18nPrefix}.${type}`}
          components={{
            author,
            decision: (
              <DecisionLink id={log.display.id} name={log.display.name} />
            ),
          }}
        />
      )

    default:
      console.warn(`Log type ${type} is not supported`)
      return type
  }
}
