import MemberLink from '@components/atoms/MemberLink'
import { LogEntry } from '@shared/model/log'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCornerDownRight } from 'react-icons/fi'

interface Props {
  log: LogEntry
}

export default function LogCancelText({ log }: Props) {
  const { t } = useTranslation()

  return log.cancelLogId ? (
    <>
      <MemberLink id={log.memberId} name={log.memberName} />{' '}
      {t('molecules.LogCancelText.canceled')}
      <br />
      <FiCornerDownRight
        style={{ display: 'inline', margin: '3px 5px 0 7px' }}
      />
    </>
  ) : null
}
