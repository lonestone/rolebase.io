import i18next from 'i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const defaultLang = 'fr'

i18next.init({
  lng: defaultLang,
  resources: {
    fr: {
      translation: fr,
    },
    en: {
      translation: en,
    },
  },
})

export default i18next
