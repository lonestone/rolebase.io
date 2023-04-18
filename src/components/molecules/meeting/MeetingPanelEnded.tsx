import IconTextButton from '@atoms/IconTextButton'
import { Button, HStack } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiPlay } from 'react-icons/fi'

export default function MeetingPanelEnded() {
  const { t } = useTranslation()
  const { handleNextStep, handleChangeForceEdit } = useContext(MeetingContext)!

  // Defau
  return (
    <HStack>
      <Button leftIcon={<FiPlay />} onClick={handleNextStep}>
        {t('MeetingPanelEnded.reopen')}
      </Button>
      <IconTextButton
        aria-label={t('MeetingPanelEnded.stop')}
        icon={<FiCheck />}
        tooltipPlacement="left"
        onClick={() => handleChangeForceEdit(false)}
      />
    </HStack>
  )
}
