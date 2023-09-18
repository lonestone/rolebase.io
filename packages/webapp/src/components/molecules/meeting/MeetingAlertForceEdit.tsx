import { Box, BoxProps, Button } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from 'src/icons'

export default function MeetingAlertForceEdit(boxProps: BoxProps) {
  const { t } = useTranslation()
  const { handleChangeForceEdit } = useContext(MeetingContext)!

  // Defau
  return (
    <Box {...boxProps}>
      <Button
        leftIcon={<CheckIcon />}
        onClick={() => handleChangeForceEdit(false)}
      >
        {t('MeetingAlertEnded.stop')}
      </Button>
    </Box>
  )
}
