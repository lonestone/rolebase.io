import { useClipboard, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useCopyUrl(url: string | undefined) {
  const { t } = useTranslation()

  const { hasCopied, onCopy, setValue } = useClipboard(url || '')
  const toast = useToast()

  useEffect(() => {
    setValue(url || '')
  }, [url])

  useEffect(() => {
    if (!hasCopied) return
    toast({ title: t('common.toastCopied'), status: 'info', duration: 1500 })
  }, [hasCopied])

  return onCopy
}
