import {
  Avatar,
  AvatarProps,
  Box,
  chakra,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import React, {
  ChangeEventHandler,
  lazy,
  Suspense,
  useCallback,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { UploadIcon } from 'src/icons'

const MemberPictureCropModal = lazy(
  () => import('@organisms/member/MemberPictureCropModal')
)

interface Props {
  id: string
  name?: string
  src?: string
  size?: AvatarProps['size']
}

export default function MemberPictureEdit({ id, name, src, size }: Props) {
  const { t } = useTranslation()

  // Image crop modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file, setFile] = useState<File | undefined>()

  // File selected
  const handlePictureFileChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      const file = event.target.files?.[0]
      if (!file) return
      setFile(file)
      onOpen()
    }, [])

  return (
    <chakra.label position="relative">
      <Tooltip
        label={t(`MemberPictureEdit.editPicture`)}
        placement="left"
        hasArrow
      >
        <Box
          position="absolute"
          w="100%"
          h="100%"
          p={3}
          zIndex={1}
          borderRadius="full"
          cursor="pointer"
          opacity={0}
          _hover={{ opacity: 1 }}
          bg="rgba(0, 0, 0, 0.2)"
          fontSize="2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <UploadIcon size={50} color="white" />
        </Box>
      </Tooltip>

      <Avatar name={name} src={src || undefined} size={size} />

      <input
        onChange={handlePictureFileChange}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />

      {isOpen && file && (
        <Suspense fallback={null}>
          <MemberPictureCropModal
            isOpen
            id={id}
            file={file}
            onClose={() => {
              onClose()
              setFile(undefined)
            }}
          />
        </Suspense>
      )}
    </chakra.label>
  )
}
