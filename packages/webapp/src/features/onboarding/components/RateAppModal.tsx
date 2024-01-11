import { BottomFixedModal } from '@/common/atoms/BottomFixedModal'
import { StarsRating } from '@/common/atoms/StarsRating'
import useUserMetadata from '@/user/hooks/useUserMetadata'
import {
  Button,
  CloseButton,
  Collapse,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Crisp } from 'crisp-sdk-web'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RateAppModal() {
  const { t } = useTranslation()
  const { metadata, setMetadata } = useUserMetadata()
  const [rating, setRating] = useState(0)
  const [clickedGift, setClickedGift] = useState(false)
  const [closed, setClosed] = useState(false)

  const handleRate = (rating: number) => {
    setRating(rating)
    Crisp.message.sendText(`Rating: ${rating}`)
  }

  const handleGiftClick = () => {
    window.open(
      'https://reviews.capterra.com/new/266082?lang=fr&utm_source=rcs&utm_campaign=9496165a-e35b-4644-b136-3c4c752de466',
      '_blank'
    )
    setClickedGift(true)
  }

  const handleClose = () => {
    setClosed(true)
    setMetadata('ratedApp', true)
  }

  const handleHelp = () => {
    Crisp.chat.show()
    Crisp.chat.open()
  }

  // Don't show if already rated
  if (metadata?.ratedApp || closed) {
    return null
  }

  return (
    <BottomFixedModal>
      {rating === 0 && (
        <CloseButton
          position="absolute"
          top={2}
          right={2}
          onClick={handleClose}
        />
      )}

      <Collapse in={rating === 0}>
        <Heading as="h2" fontSize="lg" mb={3}>
          {t('RateAppModal.question')}
        </Heading>
        <StarsRating onChange={handleRate} />
      </Collapse>

      <Collapse in={rating === 5}>
        <Heading as="h2" fontSize="lg" mb={3}>
          {t('RateAppModal.thanks')}
        </Heading>
        <Heading as="h3" fontSize="md" mb={3}>
          {t('RateAppModal.gift')}
        </Heading>
        <Text>{t('RateAppModal.giftDescription')}</Text>
        <Flex mt={5} alignItems="center">
          <Button
            variant={clickedGift ? 'solid' : 'outline'}
            onClick={handleClose}
          >
            {t(clickedGift ? 'common.close' : 'RateAppModal.declineButton')}
          </Button>
          <Spacer />
          <Button
            variant={clickedGift ? 'outline' : 'solid'}
            colorScheme="blue"
            onClick={handleGiftClick}
          >
            {t('RateAppModal.giftButton')}
          </Button>
        </Flex>
      </Collapse>

      <Collapse in={rating > 0 && rating < 5}>
        <Heading as="h2" fontSize="lg" mb={3}>
          {t('RateAppModal.feedback')}
        </Heading>
        <Flex mt={5} alignItems="center">
          <Button variant="outline" onClick={handleClose}>
            {t('common.close')}
          </Button>
          <Spacer />
          <Button variant="solid" colorScheme="blue" onClick={handleHelp}>
            {t('RateAppModal.helpButton')}
          </Button>
        </Flex>
      </Collapse>
    </BottomFixedModal>
  )
}
