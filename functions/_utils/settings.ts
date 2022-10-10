import * as dotenv from 'dotenv'
dotenv.config()

const isLocal = process.env.NHOST_ADMIN_SECRET === 'nhost-admin-secret'

export default {
  isLocal,
  url: isLocal ? 'http://localhost:3000' : 'https://rolebase.io',
  storageUrl: isLocal
    ? 'http://localhost:1337/v1/storage/files/'
    : 'https://fsudktxishllphxeibqs.storage.eu-central-1.nhost.run/v1/files/',

  forbiddenSlugs: [
    'admin',
    'signup',
    'signin',
    'login',
    'logout',
    'profile',
    'settings',
    'reset-password',
    'www',
    'backoffice',
  ],

  mail: {
    sender: {
      name: 'Rolebase.io',
      email: 'contact@rolebase.io',
    },
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

  // Notifications with MagicBell
  magicbell: {
    apiKey: process.env.MAGICBELL_API_KEY || '',
    apiSecret: process.env.MAGICBELL_API_SECRET || '',
  },
}
