import { useGetLocaleLazyQuery } from '@gql'
import { useUserId } from '@nhost/react'
import { getPureLanguageCode } from '@utils/getPureLanguageCode'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n'

export default async function useSavedUserLocale(isAuthenticated?: boolean) {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()

  const userId = useUserId()
  const langs = Object.keys(locales)
  // By default use browser locale
  const [locale, setLocale] = useState<keyof typeof locales>(
    getPureLanguageCode(language)
  )

  const [getLocale] = useGetLocaleLazyQuery()

  useEffect(() => {
    // If authenticated, retrieve locale from DB if exist
    if (isAuthenticated && userId) {
      getLocale({
        variables: {
          id: userId,
        },
        onCompleted: (data) => {
          data?.user?.locale &&
            langs.includes(data?.user?.locale) &&
            setLocale(data.user.locale as keyof typeof locales)
        },
      })
    }
  }, [isAuthenticated, userId])

  useEffect(() => {
    // Change i18n locale
    changeLanguage(locale)
  }, [locale])
}
