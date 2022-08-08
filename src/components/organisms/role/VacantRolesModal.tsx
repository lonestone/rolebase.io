import {
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  UseModalProps,
} from '@chakra-ui/react'
import CircleAndParents from '@components/molecules/CircleAndParentsLinks'
import { CircleEntry } from '@shared/model/circle'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function VacantRolesModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Filter roles
  const vacantCircles: CircleEntry[] = useMemo(() => {
    if (!circles || !roles) return []
    return (
      circles
        // Keep empty circles
        ?.filter(
          (c) =>
            c.members.length === 0 &&
            !circles.some((c2) => c2.parentId === c.id)
        )
    )
  }, [circles, roles])

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('VacantRolesModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={5}>
          {!vacantCircles || vacantCircles.length === 0 ? (
            <>{t('VacantRolesModal.empty')}</>
          ) : (
            <UnorderedList>
              {vacantCircles.map((circle) => (
                <ListItem key={circle.id}>
                  <CircleAndParents id={circle.id} />
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
