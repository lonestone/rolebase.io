import { Locale } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'
import { locales } from '../i18n'

const dateLocales: Record<keyof typeof locales, Locale> = {
  fr,
  en: enUS,
}

export function getDateLocale(lang: string): Locale {
  return dateLocales[lang as keyof typeof locales]
}
