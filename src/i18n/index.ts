import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

const defaultNS = 'translation'

const resources = {
  fr: {
    name: 'Français',
    emoji: '🇫🇷',
    translation: fr,
  },
  en: {
    name: 'English',
    emoji: '🇬🇧',
    translation: en,
  },
}

// Full typing for useTranslation
// https://react.i18next.com/latest/typescript
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['fr']
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false, 
    },
  })

export default i18n
export const locales = resources
export const langs = Object.keys(locales) as Array<keyof typeof locales>
