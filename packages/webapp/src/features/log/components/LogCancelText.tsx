import MemberLink from '@/member/components/MemberLink'
import { Icon } from '@chakra-ui/react'
import { LogFragment } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LogIcon } from 'src/icons'

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
      <Icon as={LogIcon} mt={1} mr={2} ml={3} />
    </>
  ) : null
}
