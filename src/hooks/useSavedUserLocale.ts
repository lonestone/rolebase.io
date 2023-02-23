import { useUserId, useUserLocale } from '@nhost/react'
import { getPureLanguageCode } from '@utils/getPureLanguageCode'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n'

export default async function useSavedUserLocale(isAuthenticated: boolean) {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()

  const langs = Object.keys(locales)
  const userId = useUserId()
  const userLocale = useUserLocale()
  // By default use browser locale
  const [locale, setLocale] = useState<keyof typeof locales>(
    getPureLanguageCode(language)
  )

  useEffect(() => {
    // If authenticated, retrieve locale from user in DB if exist
    if (isAuthenticated && userId && userLocale) {
      langs.includes(userLocale) &&
        setLocale(userLocale as keyof typeof locales)
    }
  }, [isAuthenticated, userId, userLocale])

  useEffect(() => {
    // Change i18n locale
    changeLanguage(locale)
  }, [locale])
}
