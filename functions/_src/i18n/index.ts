import i18next from 'i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const defaultLang = 'fr'
export const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
}

// Full typing
// https://www.i18next.com/overview/typescript#custom-type-options
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['fr']
  }
}

i18next.init({
  lng: defaultLang,
  resources,
})

export default i18next
export const locales = resources
