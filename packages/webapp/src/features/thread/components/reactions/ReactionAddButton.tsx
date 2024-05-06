import { Button, ButtonProps, Tooltip, forwardRef } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactionIcon } from 'src/icons'

export default forwardRef(function ReactionAddButton(props: ButtonProps, ref) {
  const { t } = useTranslation()
  return (
    <Tooltip
      label={t('ReactionAddButton.tooltip')}
      placement="top"
      hasArrow
      openDelay={300}
    >
      <Button
        ref={ref}
        leftIcon={<ReactionIcon size="18" />}
        size="sm"
        borderColor="transparent"
        borderWidth="1px"
        borderRadius="full"
        px={2}
        h={7}
        bg="gray.50"
        color="gray.500"
        _hover={{
          color: 'gray.800',
          borderColor: 'gray.500',
        }}
        _dark={{
          bg: 'gray.800',
          color: 'gray.400',
          _hover: {
            color: 'gray.200',
            borderColor: 'gray.500',
          },
        }}
        {...props}
      >
        +
      </Button>
    </Tooltip>
  )
})
