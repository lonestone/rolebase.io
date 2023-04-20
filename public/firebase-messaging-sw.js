/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
)

// Initialize the Firebase in the service worker
firebase.initializeApp({
  apiKey: 'AIzaSyA8seinl5fsS-mLO1uYAk-aOLkWfJfLThw',
  authDomain: 'roles-app-37879.firebaseapp.com',
  projectId: 'roles-app-37879',
  storageBucket: 'roles-app-37879.appspot.com',
  messagingSenderId: '749917420406',
  appId: '1:749917420406:web:4c0f56a228b6467cfe1857',
  measurementId: 'G-6PHDDZW2V2',
})

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging()

// Check if browser supports promise version of Notification.requestPermission()
// For example, Safari doesn't support it
function checkNotificationPromiseSupport() {
  try {
    self.Notification.requestPermission().then()
  } catch (err) {
    return false
  }
  return true
}

// Background notification to show
function backgroundMessageNotification() {
  self.navigator.serviceWorker.ready.then(function (registration) {
    messaging.onBackgroundMessage(function (payload) {
      // Currently using a workaround with payload.data instead of payload.notification
      // TODO : refacto when @novu/node 0.14.x (some changes coming for FCM integration)
      // Customize notification here
      const notificationTitle = payload.data.title
      const notificationOptions = {
        tag: payload.data.fcmTag,
        body: payload.data.content,
        data: {
          url: payload.data.actionUrl,
        },
      }

      registration.showNotification(notificationTitle, notificationOptions)
    })
  })
}

if (checkNotificationPromiseSupport()) {
  self.Notification.requestPermission().then(function (permission) {
    if (permission === 'granted') {
      backgroundMessageNotification()
    } else if (permission !== 'denied') {
      self.Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          backgroundMessageNotification()
        }
      })
    }
  })
} else {
  self.Notification.requestPermission(function (permission) {
    if (permission === 'granted') {
      backgroundMessageNotification()
    } else if (permission !== 'denied') {
      self.Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          backgroundMessageNotification()
        }
      })
    }
  })
}

// Open notification url
async function openUrl(url) {
  const windowClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  })

  for (const client of windowClients) {
    if (client.url === url && 'focus' in client) {
      return client.focus()
    }
  }

  if (self.clients.openWindow) {
    return self.clients.openWindow(url)
  }

  return null
}

addEventListener('notificationclick', async (event) => {
  // Close pushed notification
  event.notification.close()

  // Open url
  event.waitUntil(openUrl(event.notification.data.url))
})
