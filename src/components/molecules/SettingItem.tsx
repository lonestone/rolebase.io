import { Button, HStack, StackProps, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

type SettingItemProps = {
  displayName: string
  value?: string | ReactElement | null
  editable?: boolean
  onEdit?: () => void
  placeholder?: string
} & StackProps

export default function SettingItem({
  displayName,
  editable = false,
  placeholder,
  value,
  onEdit,
  ...stackProps
}: SettingItemProps) {
  const { t } = useTranslation()

  return (
    <HStack
      minH="70px"
      paddingInline="3"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="gray.300"
      {...stackProps}
    >
      <Text flex="1" fontWeight={700}>
        {displayName}
      </Text>
      <HStack spacing="4">
        {value && typeof value === 'string' && (
          <Text
            fontWeight={600}
            color="gray.700"
            _dark={{
              color: 'gray.300',
            }}
          >
            {value}
          </Text>
        )}

        {value && typeof value !== 'string' && value}

        {!value && (
          <Text as="i" fontWeight={500} color="gray.500">
            {placeholder ?? t('common.none')}
          </Text>
        )}
        {editable && onEdit && (
          <Button onClick={onEdit} color="blue.500" variant="link">
            {t('common.edit')}
          </Button>
        )}
      </HStack>
    </HStack>
  )
}
