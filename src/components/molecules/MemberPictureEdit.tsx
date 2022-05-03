import { Avatar, Box, chakra, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, {
  ChangeEventHandler,
  lazy,
  Suspense,
  useCallback,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { FiUpload } from 'react-icons/fi'

const MemberPictureCropModal = lazy(
  () => import('@components/organisms/modals/MemberPictureCropModal')
)

interface Props {
  id: string
  name?: string
  src?: string
}

export default function MemberPictureEdit({ id, name, src }: Props) {
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
        label={t(`molecules.MemberPictureEdit.editPicture`)}
        placement="top"
        hasArrow
      >
        <Box
          position="absolute"
          w="100%"
          h="100%"
          zIndex={1}
          cursor="pointer"
          opacity={0}
          _hover={{ opacity: 1 }}
          fontSize="2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FiUpload />
        </Box>
      </Tooltip>

      <Avatar name={name} src={src || undefined} size="lg" />

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
