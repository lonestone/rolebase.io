import ListItemWithButtons from '@/common/atoms/ListItemWithButtons'
import { useAuth } from '../hooks/useAuth'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { useChangeLocaleMutation } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { langs, locales } from 'src/i18n'
import { CheckIcon } from 'src/icons'
import { nhost } from 'src/nhost'

export default function LangModal(modalProps: UseModalProps) {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()
  const { user } = useAuth()

  // Mutations
  const [changeLocale] = useChangeLocaleMutation()

  const handleClick = async (locale: string) => {
    if (!user) return
    // Change i18n locale
    changeLanguage(locale)
    // Change user locale in DB
    await changeLocale({ variables: { userId: user.id, locale } })
    // Refresh user data
    await nhost.refreshSession(0)
  }

  return (
    <Modal size="xs" isCentered {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('LangModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          {langs.map((locale) => {
            const { name, emoji } = locales[locale]
            return (
              <ListItemWithButtons
                key={locale}
                buttons={locale === language ? <CheckIcon /> : null}
                onClick={() => handleClick(locale)}
              >
                {emoji}&nbsp;&nbsp;&nbsp;{name}
              </ListItemWithButtons>
            )
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
