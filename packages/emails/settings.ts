import * as dotenv from 'dotenv'
dotenv.config()

export default {
  sender: {
    name: 'Rolebase.io',
    email: 'contact@rolebase.io',
  },

  mailjet: {
    public: process.env.MAILJET_PUBIC_KEY || '',
    private: process.env.MAILJET_PRIVATE_KEY || '',
  },
}
