import MemberLink from '@atoms/MemberLink'
import { LogFragment } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCornerDownRight } from 'react-icons/fi'

interface Props {
  log: LogFragment
}

export default function LogCancelText({ log }: Props) {
  const { t } = useTranslation()

  return log.cancelLogId ? (
    <>
      <MemberLink id={log.memberId} name={log.memberName} />{' '}
      {t('LogCancelText.canceled')}
      <br />
      <FiCornerDownRight
        style={{ display: 'inline', margin: '3px 5px 0 7px' }}
      />
    </>
  ) : null
}
