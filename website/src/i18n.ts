export type Locale = 'en' | 'fr'

export const bookDemoLink = 'https://calendar.app.google/Y1mM2Lgc1FjzWFRYA'

export const translations = {
  en: {
    documentation: 'Documentation',
    guides: 'Guides',
    developers: 'Developers',
    apiReference: 'API Reference',
    apiIntroduction: 'Introduction',
    blog: 'Blog',
    blogTitle: 'Rolebase Blog',
    terms: 'Legal Notice',
    switchLang: '\uD83C\uDDEB\uD83C\uDDF7 FR',
    bookDemo: 'Book a demo',
    login: 'Log in / Sign up',
    ctaTitle: 'Try Rolebase for free',
    ctaDescription:
      'Clarify roles, run efficient meetings, and make better decisions as a team.',
    ctaButton: 'Book a demo',
    sidebarToc: 'Table of contents',
    sidebarTagline:
      'Rolebase is the open-source platform for self-managed organizations.',
    sidebarDiscover: 'Discover Rolebase',
    fieldLabel: 'Field',
    typeLabel: 'Type',
    descriptionLabel: 'Description',
    blogSubtitle:
      'Stay up to date with the latest news, product updates, and insights about self-governance.',
    similarPosts: 'Continue reading',
    updatedOn: 'Updated on',
    clientCases: 'Case Studies',
    clientCasesTitle: 'Rolebase Case Studies',
    clientCasesPath: '/client-cases',
    clientCasesSubtitle:
      'Discover how our clients use Rolebase to transform their governance.',
    sector: 'Sector',
    teamSize: 'Team size',
    employees: 'employees',
    partners: 'Partners',
    partnersVisitWebsite: 'Visit website',
    altHolaspirit: 'Alternative to Holaspirit',
    altNestr: 'Alternative to Nestr',
    features: 'Features',
    pricing: 'Pricing',
    glossary: 'Glossary',
    glossarySubtitle:
      'Key terms and definitions for self-governance and Role Based Management.',
    glossaryDefinition: 'Definition',
    support: 'Support',
    about: 'About',
    privacyPolicy: 'Privacy Policy',
    termsOfSale: 'Terms of Sale',
    footerProduct: 'Product',
    footerResources: 'Resources',
    footerCompany: 'Company',
  },
  fr: {
    documentation: 'Documentation',
    guides: 'Guides',
    developers: 'Développeurs',
    apiReference: 'Référence API',
    apiIntroduction: 'Introduction',
    blog: 'Blog',
    blogTitle: 'Blog de Rolebase',
    terms: 'Mentions légales',
    switchLang: '\uD83C\uDDEC\uD83C\uDDE7 EN',
    bookDemo: 'Demander une démo',
    login: 'Connexion / Inscription',
    ctaTitle: 'Essayez Rolebase gratuitement',
    ctaDescription:
      'Clarifiez les rôles, menez des réunions efficaces et prenez de meilleures décisions en équipe.',
    ctaButton: 'Demander une démo',
    sidebarToc: 'Sommaire',
    sidebarTagline:
      'Rolebase est la plateforme open-source pour les organisations auto-gouvernées.',
    sidebarDiscover: 'Découvrir Rolebase',
    fieldLabel: 'Champ',
    typeLabel: 'Type',
    descriptionLabel: 'Description',
    blogSubtitle:
      "Restez informé des dernières actualités, mises à jour produit et réflexions sur l'auto-gouvernance.",
    similarPosts: 'Continuer la lecture',
    updatedOn: 'Mis à jour le',
    clientCases: 'Cas clients',
    clientCasesTitle: 'Cas clients de Rolebase',
    clientCasesPath: '/client-cases',
    clientCasesSubtitle:
      'Découvrez comment nos clients utilisent Rolebase pour transformer leur gouvernance.',
    sector: 'Secteur',
    teamSize: 'Effectif',
    employees: 'collaborateurs',
    partners: 'Partenaires',
    partnersVisitWebsite: 'Visiter le site',
    altHolaspirit: 'Alternative à Holaspirit',
    altNestr: 'Alternative à Nestr',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    glossary: 'Glossaire',
    glossarySubtitle:
      'Les termes et définitions clés de la gouvernance partagée et du Role Based Management.',
    glossaryDefinition: 'Définition',
    support: 'Support',
    about: 'À propos',
    privacyPolicy: 'Politique Données Personnelles',
    termsOfSale: 'Conditions Générales de Vente',
    footerProduct: 'Produit',
    footerResources: 'Ressources',
    footerCompany: 'Entreprise',
  },
} as const

export function getLocaleFromPath(path: string): Locale {
  return path.startsWith('/fr') ? 'fr' : 'en'
}

export function getOtherLocaleHref(
  path: string,
  currentLocale: Locale
): string {
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en'
  return path.replace(`/${currentLocale}`, `/${otherLocale}`)
}

/** Extract the slug (folder name) from a content collection entry ID like "my-slug/en" */
export function getSlugFromId(id: string): string {
  return id.split('/')[0]
}

/** Get the locale suffix from a content collection entry ID like "my-slug/en" */
export function getLangFromId(id: string): Locale {
  return id.split('/')[1] as Locale
}

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`
}
