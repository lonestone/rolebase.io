import * as dotenv from 'dotenv'
dotenv.config()

const isLocal =
  !process.env.NHOST_ADMIN_SECRET ||
  process.env.NHOST_ADMIN_SECRET === 'nhost-admin-secret'

export default {
  isLocal,
  url: isLocal ? 'http://localhost:3000' : 'https://rolebase.io',
  functionsUrl: process.env.NHOST_FUNCTIONS_URL,

  defaultTimezone: 'Europe/Paris',

  forbiddenSlugs: [
    'admin',
    'signup',
    'signin',
    'login',
    'logout',
    'profile',
    'settings',
    'reset-password',
    'user-info',
    'www',
    'backoffice',
    'orgs',
    'members',
    'threads',
    'meetings',
    'meetings-recurring',
    'subscription',
    'meetings',
    'tasks',
    'decisions',
    'logs',
    'import',
  ],

  mail: {
    sender: {
      name: 'Rolebase.io',
      email: 'contact@rolebase.io',
    },
  },

  sentry: {
    dsn: 'https://96be3fef7522c1fed3e9f8b76b03c306@o297372.ingest.sentry.io/4506192581427200',
  },

  mailjet: {
    public: process.env.MAILJET_PUBIC_KEY || '',
    private: process.env.MAILJET_PRIVATE_KEY || '',
  },

  security: {
    invitation_token: process.env.SECURITY_INVITATION_TOKEN || '',
  },

  // Search with Algolia
  algolia: {
    appId: process.env.ALGOLIA_APP_ID || '',
    searchApiKey: process.env.ALGOLIA_SEARCH_API_KEY || '',
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY || '',
    indexName: 'docs',
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },

  apps: {
    office365: {
      clientId: process.env.APPS_OFFICE365_CLIENT_ID || '',
      clientSecret: process.env.APPS_OFFICE365_CLIENT_SECRET || '',
    },
    googlecalendar: {
      clientId: process.env.APPS_GOOGLECALENDAR_CLIENT_ID || '',
      clientSecret: process.env.APPS_GOOGLECALENDAR_CLIENT_SECRET || '',
    },
  },
}
