export default {
  firebase: {
    apiKey: 'AIzaSyA8seinl5fsS-mLO1uYAk-aOLkWfJfLThw',
    authDomain: 'roles-app-37879.firebaseapp.com',
    projectId: 'roles-app-37879',
    storageBucket:
      location.hostname === 'localhost'
        ? 'default-bucket'
        : 'roles-app-37879.appspot.com',
    messagingSenderId: '749917420406',
    appId: '1:749917420406:web:4c0f56a228b6467cfe1857',
  },
  firebaseFunctionsUrl:
    location.hostname === 'localhost'
      ? 'http://localhost:5001/roles-app-37879/us-central1/'
      : 'https://us-central1-roles-app-37879.cloudfunctions.net/',
}
