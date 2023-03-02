import { locales } from 'src/i18n'

export function getPureLanguageCode(locale: string) {
  // In case locale is like "en-US" and just needs to be "en"
  // And locale needs to be in current i18n locales available
  const langs = Object.keys(locales) as Array<keyof typeof locales>
  const localeFormatted = locale.slice(0, 2) as keyof typeof locales

  return langs.includes(localeFormatted) ? localeFormatted : 'en'
}
