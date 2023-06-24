const isLocal = location.hostname === 'localhost'

export default {
  isLocal,

  // Webapp url
  url: isLocal ? 'http://localhost:3000' : 'https://rolebase.io',

  // Website to redirect unauthentified users to
  websiteUrl: 'https://www.rolebase.io',

  // Nhost
  nhost: {
    subdomain: isLocal ? 'local' : 'fsudktxishllphxeibqs',
    region: isLocal ? undefined : 'eu-central-1',
  },

  functionsUrl: isLocal
    ? 'https://local.functions.nhost.run/v1/'
    : 'https://fsudktxishllphxeibqs.nhost.run/v1/functions/',

  yjsCollab: {
    url: isLocal ? 'ws://localhost:1234' : 'wss://collab.rolebase.io',
  },

  // Files
  memberPicture: {
    maxSize: 300, // in px
  },

  stripe: {
    publicKey: isLocal
      ? 'pk_test_51MTnUCFbDx5R7pIdjvJ0kQ6gzkXExNcMJxSmAhc6tmF2dTu3qYa4tNQZBFqcy3ZNCobM9cxq4w9nn3gnpHKddHDn00vrm59S4L'
      : 'pk_live_51MTnUCFbDx5R7pIdX4eYwBp6vgGF6oc47ipEL94az2BRzxgXa8p738VMYfmf2824MNiZuuqbsgtwDcaS755gcUzU00ZeBi5QjW',
  },

  userflow: {
    token: 'ct_ovu2v2gngffrrphuz7fyk57h4y',
  },
}
