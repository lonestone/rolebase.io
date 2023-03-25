import { searchReindexAll } from '@api/functions'
import { WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import {
  useGetRecurringMeetingsRrulesLazyQuery,
  useUpdateMeetingRecurringMutation,
} from '@gql'
import { getUTCDateFromDate } from '@shared/helpers/rrule'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RRule } from 'rrule'

export default function SuperAdminPage() {
  const { t } = useTranslation()
  const [getRecurringMeetings] = useGetRecurringMeetingsRrulesLazyQuery()
  const [updateMeetingRecurring] = useUpdateMeetingRecurringMutation()

  // Reindex all entities in search engine
  const [searchReindexLoading, setSearchReindexLoading] = useState(false)
  const handleSearchReindex = async () => {
    setSearchReindexLoading(true)
    await searchReindexAll({})
    setSearchReindexLoading(false)
  }

  // Fix rrules without timezone
  const handleFixTimezones = async () => {
    const { data } = await getRecurringMeetings()
    if (!data) throw new Error('No data from getRecurringMeetings')

    for (const entry of data.meeting_recurring) {
      if (!entry.rrule) continue

      const rrule = RRule.fromString(entry.rrule)
      if (rrule.origOptions.tzid) continue

      const newRRule = new RRule({
        ...rrule.origOptions,
        tzid: 'Europe/Paris',
        dtstart: getUTCDateFromDate(rrule.options.dtstart),
      })

      await updateMeetingRecurring({
        variables: {
          id: entry.id,
          values: {
            rrule: newRRule.toString(),
          },
        },
      })
    }
  }

  return (
    <Container maxW="md" mt="60px">
      <Heading size="md" mb={10}>
        {t('SuperAdminPage.heading')}
      </Heading>

      <Box mb={10}>
        <Button
          size="sm"
          leftIcon={<WarningIcon />}
          isLoading={searchReindexLoading}
          onClick={handleSearchReindex}
        >
          {t('SuperAdminPage.searchReindex')}
        </Button>

        <Button size="sm" mt={4} onClick={handleFixTimezones}>
          Fix Timezones in RRules
        </Button>
      </Box>
    </Container>
  )
}
