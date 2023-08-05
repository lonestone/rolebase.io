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
import ListItemWithButtons from '@molecules/ListItemWithButtons'
import { useUserId } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'
import { langs, locales } from 'src/i18n'
import { nhost } from 'src/nhost'

export default function LangModal(modalProps: UseModalProps) {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()
  const userId = useUserId()

  // Mutations
  const [changeLocale] = useChangeLocaleMutation()

  const handleClick = async (locale: string) => {
    if (!userId) return
    // Change i18n locale
    changeLanguage(locale)
    // Change user locale in DB
    await changeLocale({ variables: { userId, locale } })
    // Refresh user data
    await nhost.auth.refreshSession()
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
                buttons={locale === language ? <FiCheck /> : null}
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
