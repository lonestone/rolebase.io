import useDateLocale from '@/common/hooks/useDateLocale'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { getDateFromUTCDate } from '@rolebase/shared/helpers/rrule'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiClock } from 'react-icons/fi'
import { RRule } from 'rrule'
import { ChevronDownIcon, ChevronUpIcon } from 'src/icons'

export interface Props {
  rrule: RRule
  count?: number
}

export default function RRuleEditorNextDates({ rrule, count = 3 }: Props) {
  const { t } = useTranslation()
  const dateLocale = useDateLocale()
  const expanded = useDisclosure()

  // Next dates
  const nextDates = useMemo(() => {
    // After and before dates
    const after = new Date()
    const before = new Date()
    before.setFullYear(before.getFullYear() + 5)

    return rrule
      .between(after, before, true, (_, i) => i < count)
      .map((date) => getDateFromUTCDate(date))
  }, [rrule])

  return (
    <Box>
      <Button
        variant="link"
        rightIcon={
          expanded.isOpen ? (
            <ChevronUpIcon size="1em" />
          ) : (
            <ChevronDownIcon size="1em" />
          )
        }
        mt={2}
        onClick={expanded.onToggle}
      >
        {t('RRuleEditor.nextDates')}
      </Button>
      <Collapse in={expanded.isOpen} animateOpacity>
        {nextDates.map((date, i) => (
          <Flex key={i} mt={2} alignItems="center" color="gray">
            <FiClock size="1.1em" />
            <Text ml={2}>
              {capitalizeFirstLetter(
                format(date, 'PPPP, p', { locale: dateLocale })
              )}
            </Text>
          </Flex>
        ))}
      </Collapse>
    </Box>
  )
}
