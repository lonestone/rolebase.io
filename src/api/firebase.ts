import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { setNovuSubscriberCredentialsWithFcmToken } from '@api/functions'
import settings from 'src/settings'

// Initialize Firebase
const app = initializeApp({
  apiKey: settings.firebase.apiKey,
  authDomain: settings.firebase.authDomain,
  projectId: settings.firebase.projectId,
  storageBucket: settings.firebase.storageBucket,
  messagingSenderId: settings.firebase.messagingSenderId,
  appId: settings.firebase.appId,
  measurementId: settings.firebase.measurementId,
})

// Initialize FCM and get a reference to the service
const messaging = getMessaging(app)

// Check if browser supports promise version of Notification.requestPermission()
// For example, Safari doesn't support promise
const checkNotificationPromiseSupport = () => {
  try {
    Notification.requestPermission().then()
  } catch (err) {
    return false
  }
  return true
}

const registerDeviceToken = async () => {
  // Get device token and register it in Novu
  return getToken(messaging, {
    vapidKey: settings.fcmVapidKey,
  })
    .then((currentToken: any) => {
      if (currentToken) {
        // Register device token in Novu for push notification
        setNovuSubscriberCredentialsWithFcmToken({ token: currentToken })
      } else {
        console.log('No registration token available.')
      }
    })
    .catch((err: any) => {
      console.log('An error occurred while retrieving token.', err)
    })
}

// Get device token from Firebase required for sending Push notifications to device
export const getTokenFromFirebase = async () => {
  // Check if browser supports notifications
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return
  }

  // Check support for Notification.requestPermission()
  if (checkNotificationPromiseSupport()) {
    Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        await registerDeviceToken()
      } else if (permission !== 'denied') {
        // If "default" permission, ask user for permission
        Notification.requestPermission().then(async (permission) => {
          if (permission === 'granted') {
            await registerDeviceToken()
          }
        })
      }
    })
  } else {
    Notification.requestPermission(async (permission) => {
      if (permission === 'granted') {
        await registerDeviceToken()
      } else if (permission !== 'denied') {
        Notification.requestPermission(async (permission) => {
          if (permission === 'granted') {
            await registerDeviceToken()
          }
        })
      }
    })
  }
}

// Listen to push messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      resolve(payload)
    })
  })
