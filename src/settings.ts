const isLocal = location.hostname === 'localhost'

export default {
  isLocal,

  // Webapp url
  url: isLocal ? 'http://localhost:3000' : 'https://rolebase.io',

  // Website to redirect unauthentified users to
  websiteUrl: 'https://www.rolebase.io',

  // Nhost
  nhost: {
    subdomain: isLocal ? 'localhost' : 'fsudktxishllphxeibqs',
    region: isLocal ? undefined : 'eu-central-1',
  },

  functionsUrl: isLocal
    ? 'http://localhost:1337/v1/functions/'
    : 'https://fsudktxishllphxeibqs.nhost.run/v1/functions/',

  yjsCollab: {
    url: isLocal ? 'ws://localhost:1234' : 'wss://collab.rolebase.io',
  },

  // Files
  memberPicture: {
    maxSize: 300, // in px
  },
}
