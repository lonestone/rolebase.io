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

  // Stripe
  stripe: {
    publicKey: isLocal
      ? 'pk_test_51MTnUCFbDx5R7pIdjvJ0kQ6gzkXExNcMJxSmAhc6tmF2dTu3qYa4tNQZBFqcy3ZNCobM9cxq4w9nn3gnpHKddHDn00vrm59S4L'
      : 'pk_live_51MTnUCFbDx5R7pIdX4eYwBp6vgGF6oc47ipEL94az2BRzxgXa8p738VMYfmf2824MNiZuuqbsgtwDcaS755gcUzU00ZeBi5QjW',
  },

  // Firebase
  firebase: {
    apiKey: 'AIzaSyA8seinl5fsS-mLO1uYAk-aOLkWfJfLThw',
    authDomain: 'roles-app-37879.firebaseapp.com',
    projectId: 'roles-app-37879',
    storageBucket: 'roles-app-37879.appspot.com',
    messagingSenderId: '749917420406',
    appId: '1:749917420406:web:4c0f56a228b6467cfe1857',
    measurementId: 'G-6PHDDZW2V2',
  },

  // Firebase Cloud Messaging
  fcmVapidKey:
    'BFXdNbG7Qn0v7z1DF7jbdvr45QSny8MyxDyAbqWxToeZHDRIQT5lMJyISivQFKW9BTXEFczjldRdEi5F6tO5yhU',
}
