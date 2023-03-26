import GlassBox from '@atoms/GlassBox'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react'
import useMemberPreferences from '@hooks/useMemberPreferences'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StarsRating } from '../../molecules/StarsRating'

export default function RateAppModal() {
  const { t } = useTranslation()
  const { preferences, setPreference } = useMemberPreferences()
  const [rating, setRating] = useState(0)
  const [clickedGift, setClickedGift] = useState(false)
  const [closed, setClosed] = useState(false)

  const handleRate = (rating: number) => {
    setRating(rating)
    const $crisp = (window as any).$crisp
    if (!$crisp) {
      throw new Error('Crisp not found')
    }
    $crisp.push(['do', 'message:send', ['text', `Rating: ${rating}`]])
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
    setPreference('ratedApp', true)
  }

  const handleHelp = () => {
    const $crisp = (window as any).$crisp
    if (!$crisp) {
      throw new Error('Crisp not found')
    }
    $crisp.push(['do', 'chat:show'])
    $crisp.push(['do', 'chat:open'])
  }

  // Don't show if already rated
  if (preferences?.ratedApp || closed) {
    return null
  }

  return (
    <>
      <Box
        position="fixed"
        zIndex="2000"
        h="200px"
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(255,255,255,0), rgba(255,255,255,0.9))"
        _dark={{
          bgGradient: 'linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.9))',
        }}
        pointerEvents="none"
      />

      <GlassBox
        position="fixed"
        zIndex="2000"
        w="340px"
        ml="-170px"
        left="50%"
        bottom={2}
        p={5}
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
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
      </GlassBox>
    </>
  )
}
