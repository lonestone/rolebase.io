import useDateLocale from '@/common/hooks/useDateLocale'
import MemberLink from '@/member/components/MemberLink'
import useMember from '@/member/hooks/useMember'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Icon,
  LinkBoxProps,
  Text,
} from '@chakra-ui/react'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React, { ReactNode, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'

interface Props extends LinkBoxProps {
  i18nKey: string
  date: string
  memberId?: string
  icon?: IconType
  children: ReactNode
}

export default function NewsItemLayout({
  i18nKey,
  date: dateStr,
  memberId,
  icon,
  children,
}: Props) {
  const { t } = useTranslation()
  const dateLocale = useDateLocale()
  const date = useMemo(() => new Date(dateStr), [dateStr])
  const member = useMember(memberId)

  return (
    <Card>
      <CardHeader display="flex" alignItems="center" pb={0}>
        {icon ? (
          <Icon as={icon} w="2em" h="2em" />
        ) : (
          member && (
            <Avatar
              name={member.name || '?'}
              src={member.picture || undefined}
              w="2em"
              h="2em"
            />
          )
        )}

        <Box flex="1" ml={3}>
          <Text>
            <Trans
              i18nKey={i18nKey as any}
              components={{
                author: member ? (
                  <MemberLink id={member.id} name={member.name} />
                ) : (
                  <>…</>
                ),
              }}
            />
          </Text>
          <Text fontSize="sm" fontWeight="normal" color="gray.400">
            {capitalizeFirstLetter(
              format(date, 'PPPP', {
                locale: dateLocale,
              })
            )}
            {t('common.dates.dateHourSeparator')}
            {format(date, 'HH:mm', {
              locale: dateLocale,
            })}
          </Text>
        </Box>
      </CardHeader>

      <CardBody p={4}>{children}</CardBody>
    </Card>
  )
}
