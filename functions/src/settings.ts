export default {
  url: process.env.FUNCTIONS_EMULATOR
    ? 'http://localhost:3000'
    : 'https://rolebase.io',
  mail: {
    sender: {
      name: 'Rolesapp',
      email: 'contact@rolebase.io',
    },
  },
}
