export type Locale = 'en' | 'fr'

export const bookDemoLink = 'https://calendar.app.google/Y1mM2Lgc1FjzWFRYA'

export const translations = {
  en: {
    documentation: 'Documentation',
    guides: 'Guides',
    developers: 'Developers',
    apiReference: 'API Reference',
    orgMembers: 'Organization & Members',
    circlesRoles: 'Circles & Roles',
    meetings: 'Meetings',
    tasks: 'Tasks',
    threads: 'Threads',
    other: 'Other',
    blog: 'Blog',
    terms: 'Terms',
    switchLang: '\uD83C\uDDEB\uD83C\uDDF7 FR',
    bookDemo: 'Book a demo',
    login: 'Log in / Sign up',
    footerProduct: 'Product',
    footerFeatures: 'Features',
    footerCaseStudies: 'Case Studies',
    footerPricing: 'Pricing',
    footerResources: 'Resources',
    footerGlossary: 'Glossary',
    footerSupport: 'Support',
    footerCompany: 'Company',
    footerAbout: 'About',
    footerPrivacyPolicy: 'Privacy Policy',
    footerTermsOfSale: 'Terms of Sale',
    docsLinks: [
      { slug: '', label: 'Introduction' },
      { slug: 'getting-started', label: 'Getting Started' },
      { slug: 'organizations', label: 'Organizations' },
      { slug: 'org-chart', label: 'Org Chart' },
      { slug: 'circles-and-roles', label: 'Roles' },
      { slug: 'members', label: 'Members' },
      { slug: 'meetings', label: 'Meetings' },
      { slug: 'tasks', label: 'Tasks' },
      { slug: 'threads', label: 'Threads & Discussions' },
      { slug: 'decisions', label: 'Decisions' },
      { slug: 'news-feed', label: 'News Feed' },
      { slug: 'apps-integrations', label: 'Apps & Integrations' },
      { slug: 'subscriptions', label: 'Subscriptions' },
      { slug: 'import', label: 'Import' },
    ],
    guidesLinks: [
      { slug: 'run-your-first-meeting', label: 'Run Your First Meeting' },
    ],
    developersLinks: [
      { slug: '', label: 'Introduction' },
      { slug: 'getting-started', label: 'Getting Started' },
      { slug: 'custom-integrations', label: 'Custom Integrations' },
    ],
  },
  fr: {
    documentation: 'Documentation',
    guides: 'Guides',
    developers: 'Développeurs',
    apiReference: 'Référence API',
    orgMembers: 'Organisation & Membres',
    circlesRoles: 'Cercles & Rôles',
    meetings: 'Réunions',
    tasks: 'Tâches',
    threads: 'Fils de discussion',
    other: 'Autres',
    blog: 'Blog',
    terms: 'Mentions légales',
    switchLang: '\uD83C\uDDEC\uD83C\uDDE7 EN',
    bookDemo: 'Demander une démo',
    login: 'Connexion / Inscription',
    footerProduct: 'Produit',
    footerFeatures: 'Fonctionnalités',
    footerCaseStudies: 'Cas clients',
    footerPricing: 'Tarifs',
    footerResources: 'Ressources',
    footerGlossary: 'Glossaire',
    footerSupport: 'Support',
    footerCompany: 'Entreprise',
    footerAbout: 'À propos',
    footerPrivacyPolicy: 'Politique Données Personnelles',
    footerTermsOfSale: 'Conditions Générales de Vente',
    docsLinks: [
      { slug: '', label: 'Introduction' },
      { slug: 'getting-started', label: 'Premiers pas' },
      { slug: 'organizations', label: 'Organisations' },
      { slug: 'org-chart', label: 'Organigramme' },
      { slug: 'circles-and-roles', label: 'Rôles' },
      { slug: 'members', label: 'Membres' },
      { slug: 'meetings', label: 'Réunions' },
      { slug: 'tasks', label: 'Tâches' },
      { slug: 'threads', label: 'Fils de discussion' },
      { slug: 'decisions', label: 'Décisions' },
      { slug: 'news-feed', label: "Fil d'actualité" },
      { slug: 'apps-integrations', label: 'Apps & Intégrations' },
      { slug: 'subscriptions', label: 'Abonnements' },
      { slug: 'import', label: 'Import' },
    ],
    guidesLinks: [
      { slug: 'run-your-first-meeting', label: 'Animer votre première réunion' },
    ],
    developersLinks: [
      { slug: '', label: 'Introduction' },
      { slug: 'getting-started', label: 'Premiers pas' },
      { slug: 'custom-integrations', label: 'Intégrations personnalisées' },
    ],
  },
} as const

export function getLocaleFromPath(path: string): Locale {
  return path.startsWith('/fr') ? 'fr' : 'en'
}

export function getOtherLocaleHref(path: string, currentLocale: Locale): string {
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en'
  return path.replace(`/${currentLocale}`, `/${otherLocale}`)
}

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`
}
