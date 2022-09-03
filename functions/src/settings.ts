export default {
  url: process.env.FUNCTIONS_EMULATOR
    ? 'http://localhost:3000'
    : 'https://rolebase.io',

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
