import CirclePickerModal from '@/circle/modals/CirclePickerModal'
import { useDisclosure } from '@chakra-ui/react'
import { SearchTypes } from '@rolebase/shared/model/search'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const pickCircleId = 'pickCircle'

export default function useCirclePicker(onSelect: (itemId: string) => void) {
  const { t } = useTranslation()
  const modal = useDisclosure()

  const additionalTopItems = useMemo(
    () => [
      {
        id: pickCircleId,
        title: t('useCirclePicker.pickCircle'),
        text: '',
        type: SearchTypes.PickCircle,
      },
    ],
    []
  )

  const handleChange = (itemId: string) => {
    if (itemId === pickCircleId) {
      // Open circle picker
      modal.onOpen()
      return
    }

    onSelect(itemId)
  }

  const pickerModal = modal.isOpen && (
    <CirclePickerModal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      onSelect={(circleId) => {
        modal.onClose()
        handleChange(circleId)
      }}
    />
  )

  return { pickerModal, additionalTopItems, handleChange }
}
