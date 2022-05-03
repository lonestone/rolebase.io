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

// const locales = {
//   fr,
//   en,
// }

// type Locales = keyof typeof locales

// const defaultLang: Locales = 'fr'

// export function t(
//   lang: Locales | undefined,
//   key: string,
//   ...params: any[]
// ): string {
//   // Get translations
//   let translations = lang && locales[lang]
//   if (!translations) {
//     translations = locales[defaultLang]
//     console.warn(`Locale ${lang} not found`)
//   }

//   // Return translation from key
//   return translations[key] ?? key
// }
