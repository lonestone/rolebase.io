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

  stripe: {
    publicKey:
      'pk_test_51MTnUCFbDx5R7pIdjvJ0kQ6gzkXExNcMJxSmAhc6tmF2dTu3qYa4tNQZBFqcy3ZNCobM9cxq4w9nn3gnpHKddHDn00vrm59S4L',
  },
}
