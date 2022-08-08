import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ListItemWithButtons from '@components/molecules/ListItemWithButtons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'
import { locales } from 'src/i18n'

const langs = Object.keys(locales) as Array<keyof typeof locales>

export default function LangModal(modalProps: UseModalProps) {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()

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
                title={
                  <>
                    {emoji}&nbsp;&nbsp;&nbsp;{name}
                  </>
                }
                buttons={locale === language ? <FiCheck /> : null}
                onClick={() => changeLanguage(locale)}
              />
            )
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
