export default {
  url: process.env.FUNCTIONS_EMULATOR
    ? 'http://localhost:3000'
    : 'https://rolebase.io',

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
}
