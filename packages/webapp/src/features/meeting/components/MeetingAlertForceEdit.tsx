import { Box, BoxProps, Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from 'src/icons'
import { MeetingContext } from '../contexts/MeetingContext'

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
