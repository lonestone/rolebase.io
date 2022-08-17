import { useClipboard, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useCopyUrl(url: string | undefined) {
  const { t } = useTranslation()

  // URL copy
  const { hasCopied, onCopy } = useClipboard(url || '')
  const toast = useToast()

  useEffect(() => {
    if (!hasCopied) return
    toast({
      title: t('common.toastCopied'),
      status: 'info',
      duration: 1500,
    })
  }, [hasCopied])

  return onCopy
}
