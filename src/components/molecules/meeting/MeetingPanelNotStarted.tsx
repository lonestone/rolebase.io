import BounceAnimation from '@atoms/BounceAnimation'
import { Button } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlay } from 'react-icons/fi'

interface Props {
  onStart: () => void
}

export default function MeetingPanelNotStarted({ onStart }: Props) {
  const { t } = useTranslation()

  const { meeting, isStartTimePassed, handleNextStep } =
    useContext(MeetingContext)!

  // Start meeting
  const handleStart = useCallback(() => {
    handleNextStep()
    onStart()
  }, [meeting, handleNextStep])

  return (
    <BounceAnimation active={isStartTimePassed}>
      <Button
        leftIcon={<FiPlay />}
        colorScheme="green"
        variant={isStartTimePassed ? 'solid' : 'outline'}
        onClick={handleStart}
      >
        {t('MeetingPanelNotStarted.start')}
      </Button>
    </BounceAnimation>
  )
}
