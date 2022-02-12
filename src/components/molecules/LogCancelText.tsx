import MemberLink from '@components/atoms/MemberLink'
import { LogEntry } from '@shared/log'
import React from 'react'
import { FiCornerDownRight } from 'react-icons/fi'

interface Props {
  log: LogEntry
}

export default function LogCancelText({ log }: Props) {
  return log.cancelLogId ? (
    <>
      <MemberLink id={log.memberId} name={log.memberName} /> a annulé l'action :
      <br />
      <FiCornerDownRight
        style={{ display: 'inline', margin: '3px 5px 0 7px' }}
      />
    </>
  ) : null
}
