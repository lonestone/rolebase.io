export default {
  url: process.env.FUNCTIONS_EMULATOR
    ? 'http://localhost:3000'
    : 'https://hq.lonestone.io',
  mail: {
    sender: {
      name: 'Rolesapp',
      email: 'contact@lonestone.studio',
    },
  },
}
