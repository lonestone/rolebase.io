import IconTextButton from '@atoms/IconTextButton'
import {
  ButtonProps,
  Kbd,
  Menu,
  MenuButton,
  MenuList,
  StackItem,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import { cmdOrCtrlKey } from '@utils/env'
import { useTranslation } from 'react-i18next'
import { FaKeyboard } from 'react-icons/fa'

export default function CirclesKeyboardShortcuts(buttonProps: ButtonProps) {
  const { t } = useTranslation()
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)')
  const isMember = useOrgMember()

  if (isSmallScreen || !isMember) {
    return null
  }

  return (
    <Menu>
      <MenuButton
        as={IconTextButton}
        icon={<FaKeyboard />}
        aria-label={t('CirclesKeyboardShortcuts.label')}
        className="userflow-graph-views"
        {...buttonProps}
      />

      <MenuList zIndex={2000} shadow="md" p={4}>
        <Text mb={4} fontWeight="bold">
          {t('CirclesKeyboardShortcuts.label')}
        </Text>

        <VStack spacing={2} align="stretch" fontSize="sm" pointerEvents="auto">
          <StackItem>
            <Kbd>{cmdOrCtrlKey}</Kbd> + <Kbd>Click</Kbd>
            {t('CirclesKeyboardShortcuts.CmdClick')}
          </StackItem>
          <StackItem>
            <Kbd>{cmdOrCtrlKey}</Kbd> + <Kbd size="xl">⇧</Kbd> +{' '}
            <Kbd>Click</Kbd>
            {t('CirclesKeyboardShortcuts.CmdShiftClick')}
          </StackItem>
        </VStack>
      </MenuList>
    </Menu>
  )
}
