import useOrgOwner from '@/member/hooks/useOrgOwner'
import useUserMetadata from '@/user/hooks/useUserMetadata'
import { Box, Button, CloseButton, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const BOOK_DEMO_URL = 'https://calendar.app.google/Y1mM2Lgc1FjzWFRYA'

export default function BookDemoTopBar() {
  const { t } = useTranslation()
  const { metadata, setMetadata } = useUserMetadata()
  const isOwner = useOrgOwner()
  const [closed, setClosed] = useState(false)

  const handleClose = () => {
    setClosed(true)
    setMetadata('bookDemoInfo', true)
  }

  const handleBookDemo = () => {
    window.open(BOOK_DEMO_URL, '_blank')
  }

  if (!isOwner || metadata?.bookDemoInfo || closed) {
    return null
  }

  return (
    <Box
      bg="purple.600"
      _dark={{ bg: 'purple.500' }}
      color="white"
      py={2}
      px={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={2000}
      sx={{
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={4}
        maxW="container.xl"
        mx="auto"
        pr={10}
      >
        <Text fontSize="sm" fontWeight="medium">
          {t('BookDemoTopBar.message')}
        </Text>
        <Button
          size="sm"
          bg="white"
          color="gray.800"
          _hover={{ bg: 'gray.100' }}
          onClick={handleBookDemo}
          aria-label={t('BookDemoTopBar.button')}
          tabIndex={0}
        >
          {t('BookDemoTopBar.button')}
        </Button>
        <CloseButton
          position="absolute"
          right={2}
          top="50%"
          transform="translateY(-50%)"
          color="white"
          onClick={handleClose}
          aria-label={t('common.close')}
          tabIndex={0}
          _hover={{ bg: 'purple.700', _dark: { bg: 'purple.600' } }}
        />
      </Flex>
    </Box>
  )
}
