import { Box, BoxProps, Button, Center, useDisclosure } from '@chakra-ui/react'
import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon, ChevronUpIcon } from 'src/icons'

interface Props extends BoxProps {
  children: React.ReactNode
  noOfLines: number
}

export const ExpandableText = forwardRef<HTMLDivElement, Props>(
  ({ children, noOfLines, ...rest }, ref) => {
    const { t } = useTranslation()
    const expanded = useDisclosure()
    const [isTextClamped, setIsTextClamped] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
      // Wait for the box to use noOfLines prop
      setTimeout(() => {
        if (!inputRef.current || !inputRef.current.clientHeight) {
          return
        }
        // Detect if text is clamp with scroll height
        setIsTextClamped(
          inputRef.current.scrollHeight > inputRef.current.clientHeight ||
            expanded.isOpen
        )
      }, 10)
    }, [setIsTextClamped, children])

    return (
      <Box ref={ref} {...rest}>
        <Box ref={inputRef} noOfLines={expanded.isOpen ? undefined : noOfLines}>
          {children}
        </Box>
        {isTextClamped && (
          <Center>
            <Button
              variant="link"
              rightIcon={
                expanded.isOpen ? (
                  <ChevronUpIcon size="1em" />
                ) : (
                  <ChevronDownIcon size="1em" />
                )
              }
              mt={2}
              onClick={expanded.onToggle}
            >
              {expanded.isOpen ? t('common.seeLess') : t('common.seeMore')}
            </Button>
          </Center>
        )}
      </Box>
    )
  }
)

ExpandableText.displayName = 'ExpandableText'
