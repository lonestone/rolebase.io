const isLocal = location.hostname === 'localhost'

export default {
  isLocal,
  url: isLocal ? 'http://localhost:3000' : 'https://rolebase.io',
  websiteUrl: 'https://www.rolebase.io',

  // Nhost
  nhost: {
    subdomain: isLocal ? 'localhost' : 'fsudktxishllphxeibqs',
    region: isLocal ? undefined : 'eu-central-1',
  },

  functionsUrl: isLocal
    ? 'http://localhost:1337/v1/functions/'
    : 'https://fsudktxishllphxeibqs.nhost.run/v1/functions/',

  // Files
  memberPicture: {
    maxSize: 300, // in px
  },
}
