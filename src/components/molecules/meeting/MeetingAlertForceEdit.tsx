import { Box, BoxProps, Button } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'

export default function MeetingAlertForceEdit(boxProps: BoxProps) {
  const { t } = useTranslation()
  const { handleChangeForceEdit } = useContext(MeetingContext)!

  // Defau
  return (
    <Box {...boxProps}>
      <Button
        leftIcon={<FiCheck />}
        onClick={() => handleChangeForceEdit(false)}
      >
        {t('MeetingAlertEnded.stop')}
      </Button>
    </Box>
  )
}
