import { Box, HStack, VStack } from '@chakra-ui/layout'
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function SubscriptionReachedMemberLimitModal(
  modalProps: Omit<ModalProps, 'children'>
) {
  const { t } = useTranslation()

  return (
    <Modal size="4xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt="8">
          <HStack spacing={8}>
            <VStack flexBasis="60%" alignItems="start" spacing="5">
              <Text fontSize={28} fontWeight={600} lineHeight={1}>
                {t('SubscriptionReachedMemberLimitModal.title')}
              </Text>
              <Text fontSize={16} fontWeight={600}>
                {t('SubscriptionReachedMemberLimitModal.limitReached')}
              </Text>
            </VStack>

            <Box>
              <Image src="/src/images/question_plan.png" />
            </Box>
          </HStack>
        </ModalBody>
        <ModalFooter mt="4" justifyContent="center">
          <Button variant="ghost" onClick={() => modalProps.onClose()}>
            {t('SubscriptionReachedMemberLimitModal.hide')}
          </Button>
          <Button as="a" mr="2" href="subscription" colorScheme="purple">
            {t('SubscriptionReachedMemberLimitModal.upgradePlan')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
