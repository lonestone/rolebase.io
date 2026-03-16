import type { AstroUserConfig } from 'astro'

type Redirects = NonNullable<AstroUserConfig['redirects']>

// Static redirections only, wildcards in netlify.toml
export const redirects: Redirects = {
  '/demande-demo': '/fr/contact',
  '/tarifs': '/fr/pricing',

  // Blog redirects: pre-2026 posts (FR old slugs)
  '/blog/10-bonnes-pratiques-pour-la-gouvernance-collaborative':
    '/fr/blog/collaborative-governance',
  '/blog/10-conseils-pour-des-retours-constructifs-entre-pairs':
    '/fr/blog/peer-feedback',
  '/blog/3-solutions-pour-ameliorer-la-communication-dequipe':
    '/fr/blog/team-communication',
  '/blog/5-etapes-pour-optimiser-vos-reunions-dequipe':
    '/fr/blog/optimize-meetings',
  '/blog/7-outils-essentiels-pour-la-gestion-dequipes-horizontales':
    '/fr/blog/horizontal-tools',
  '/blog/checklist-mise-en-place-dune-structure-horizontale':
    '/fr/blog/horizontal-checklist',
  '/blog/comment-attribuer-des-roles-en-reunion':
    '/fr/blog/assign-roles-meetings',
  '/blog/comment-decider-en-collectif-avec-la-decision-par-consentement':
    '/fr/blog/consent-decision',
  '/blog/comment-definir-les-roles-dans-une-organisation-horizontale':
    '/fr/blog/define-roles',
  '/blog/comment-donner-un-feedback-constructif-avec-la-methode-oscar':
    '/fr/blog/oscar-feedback',
  '/blog/comment-faire-des-comptes-rendus-de-reunions-gagner-du-temps-nourrir-la-documentation-interne':
    '/fr/blog/meeting-minutes',
  '/blog/comment-integrer-lamelioration-continue-au-management-horizontal':
    '/fr/blog/continuous-improvement',
  '/blog/comment-integrer-le-feedback-dans-la-gestion-horizontale':
    '/fr/blog/feedback-horizontal',
  '/blog/comment-la-gestion-horizontale-renforce-la-confiance':
    '/fr/blog/horizontal-trust',
  '/blog/creer-un-organigramme-pour-votre-entreprise':
    '/fr/blog/create-org-chart',
  '/blog/differences-entre-structure-plate-et-hierarchique':
    '/fr/blog/flat-vs-hierarchical',
  '/blog/faq-management-horizontal-et-productivite-dequipe':
    '/fr/blog/horizontal-faq',
  '/blog/guide-complet-sur-lanalyse-de-sentiment-dequipe':
    '/fr/blog/sentiment-analysis',
  '/blog/guide-complet-transition-vers-un-management-horizontal':
    '/fr/blog/horizontal-transition',
  '/blog/guide-ultime-des-organigrammes-open-source':
    '/fr/blog/open-source-org-charts',
  '/blog/holacratie-vs-sociocratie-quelles-differences':
    '/fr/blog/holacracy-vs-sociocracy',
  '/blog/introduction-a-la-sociocratie-une-approche-dynamique-de-la-gouvernance':
    '/fr/blog/sociocracy-intro',
  '/blog/introduction-a-lholacratie-repenser-la-gouvernance-organisationnelle':
    '/fr/blog/holacracy-intro',
  '/blog/introduction-au-role-based-management-votre-solution-contre-les-silos':
    '/fr/blog/role-based-management',
  '/blog/introduction-aux-methodes-agiles': '/fr/blog/agile-methods',
  '/blog/la-reunion-de-gouvernance-pour-faire-evoluer-son-organisation':
    '/fr/blog/governance-meeting',
  '/blog/la-reunion-tactique-ou-reunion-de-triage': '/fr/blog/tactical-meeting',
  '/blog/la-reunionite-aigue-definition-en-entreprise-et-nos-solutions-pour-y-dire-stop':
    '/fr/blog/meeting-overload',
  '/blog/le-role-de-leader-en-holacratie': '/fr/blog/holacracy-leader',
  '/blog/leadership-horizontal-vs-leadership-traditionnel':
    '/fr/blog/horizontal-leadership',
  '/blog/les-meilleures-solutions-open-source-pour-creer-un-organigramme':
    '/fr/blog/open-source-org-chart-tools',
  '/blog/management-horizontal-vs-vertical-avantages-et-differences':
    '/fr/blog/horizontal-vs-vertical',
  '/blog/mieux-attribuer-les-roles-avec-lelection-sans-candidat':
    '/fr/blog/election-without-candidate',
  '/blog/pourquoi-remplacer-la-fiche-de-poste-par-des-roles':
    '/fr/blog/roles-vs-job-descriptions',
  '/blog/reunion-a-distance-efficaces-nos-secrets-pour-lentreprise-hybride-ou-full-remote':
    '/fr/blog/remote-meetings',
  '/blog/reunionite-le-pourquoi-selon-un-chercheur-et-nos-5-conseils-pour-la-combattre':
    '/fr/blog/meeting-overload-tips',

  // Blog redirects: 2026 posts (EN old slugs)
  '/blog/the-dynamic-organisational-chart-or-the-org-chart-of-the-future':
    '/en/blog/dynamic-org-chart',
  '/blog/the-movement-that-has-been-questioning-management-for-over-50-years':
    '/en/blog/management-movement',
  '/blog/the-no-1-pitfall-of-business-owners-when-scaling-and-how-to-avoid-it':
    '/en/blog/scaling-pitfall',
  '/blog/the-subtle-but-constant-ways-your-team-is-losing-energy-and-focus':
    '/en/blog/team-energy-loss',
  '/blog/why-hierarchy-isnt-a-very-good-way-of-organising-work-today':
    '/en/blog/hierarchy-problems',
  '/blog/how-to-craft-incredibly-productive-meetings':
    '/en/blog/productive-meetings',
  '/blog/how-to-actually-make-project-handovers-between-teams-efficient':
    '/en/blog/project-handovers',
}
