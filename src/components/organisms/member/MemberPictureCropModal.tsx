import { updateMember, uploadPicture } from '@api/entities/members'
import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  UseModalProps,
  useToast,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import { useAsyncMemo } from '@hooks/useAsyncMemo'
import { useOrgId } from '@hooks/useOrgId'
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'
import { useTranslation } from 'react-i18next'
import { FiRotateCw } from 'react-icons/fi'
import { getCroppedImg } from 'src/canvasUtils'
import settings from 'src/settings'
import { readFile } from 'src/utils'

interface Props extends UseModalProps {
  id: string
  file: File
}

export default function MemberPictureCropModal({
  id,
  file,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const toast = useToast()
  const orgId = useOrgId()

  const imageSrc = useAsyncMemo(() => readFile(file), [file], null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>()

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const handleSubmit = useCallback(async () => {
    if (!orgId || !imageSrc || !croppedAreaPixels) return
    const croppedImg = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation,
      undefined,
      settings.memberPicture.maxSize
    )

    // Upload picture
    try {
      if (!croppedImg) {
        throw new Error('Une erreur est survenue lors du recadrage')
      }

      // Upload picture
      const picture = await uploadPicture(orgId, id, croppedImg)

      // Save picture url to member
      await updateMember(id, { picture })

      modalProps.onClose()
      toast({
        title: t('MemberPictureCropModal.toastSuccess'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : '',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [id, orgId, imageSrc, croppedAreaPixels])

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('MemberPictureCropModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {!imageSrc ? (
            <Loading active size="xl" />
          ) : (
            <>
              <Box position="relative" h="400px">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onRotationChange={setRotation}
                  onZoomChange={setZoom}
                />
              </Box>

              <HStack mt={2}>
                <Slider
                  aria-label="Zoom"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={setZoom}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>

                <IconButton
                  aria-label="Tourner à 90°"
                  icon={<FiRotateCw />}
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                />
              </HStack>
            </>
          )}
        </ModalBody>

        <ModalFooter alignItems="end">
          <Button variant="ghost" mr={3} onClick={modalProps.onClose}>
            {t('common.cancel')}
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {t('common.save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}