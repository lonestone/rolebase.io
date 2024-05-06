import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import emojiData, { Emoji, EmojiMartData } from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  placement?: PlacementWithLogical
  children: React.ReactNode
  onSelect: (shortcode: string) => void
}

export interface EmojiHandler {
  id: string // 'the_horns'
  name: string // 'Sign of the Horns'
  native: string // '🤘🏽'
  unified: string // '1f918-1f3fd'
  keywords: string[] // ['hand', 'fingers', 'evil', 'eye', 'rock', 'on']
  shortcodes: string // ':the_horns::skin-tone-4:'
  skin: number // 4
  aliases: string[] // ['sign_of_the_horns']
}

export default function EmojiPicker({ placement, onSelect, children }: Props) {
  const {
    i18n: { language },
  } = useTranslation()
  const { colorMode } = useColorMode()

  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleEmojiSelect = (emoji: EmojiHandler) => {
    onSelect(
      emoji.shortcodes
        // Remove options (skin tone)
        .replace(/::.*/, ':')
    )
    onClose()
  }

  const picker = (
    <Picker
      data={emojiData}
      autoFocus
      skinTonePosition="none"
      theme={colorMode === 'dark' ? 'dark' : 'light'}
      locale={language.substring(0, 2)}
      onEmojiSelect={handleEmojiSelect}
    />
  )

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      isLazy
      boundary="scrollParent"
      placement={placement}
      autoFocus={false}
      returnFocusOnClose={false}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        {isMobile ? (
          <Modal isOpen={isOpen} isCentered size="sm" onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="transparent">
              <ModalBody p={0}>{picker}</ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          <PopoverContent width="auto" transform="none">
            <PopoverArrow />
            <PopoverBody p={0}>{picker}</PopoverBody>
          </PopoverContent>
        )}
      </Portal>
    </Popover>
  )
}

export function findEmoji(shortcode: string): Emoji | undefined {
  return (emojiData as EmojiMartData).emojis[shortcode.replace(/^:|:$/g, '')]
}
