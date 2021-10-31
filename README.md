# Inspirations

- https://observablehq.com/@d3/circle-packing
- https://observablehq.com/@d3/zoomable-circle-packing
- https://wattenberger.com/blog/react-and-d3

# Firebase

firebase init firestore

// Deploy rules
firebase deploy --only firestore:rules

// Export indexes
firebase firestore:indexes > firestore.indexes.json

https://firebase.google.com/products/extensions/firestore-send-email

## Settings

settings.ts

## Config

- security.invitation_token: Generate a token once (with Lastpass for example):
- mailjet.public: MailJet public key
- mailjet.private: MailJet private key

To set config from .runtimeconfig.json
npm run set-config

To fetch config to .runtimeconfig.json
npm run get-config

MailJet Keys:
https://app.mailjet.com/account/api_keys

To set a key:
firebase functions:config:set mailjet.private="XXX"

Don't forget to deploy
firebase deploy --only functions

### Other

firebase functions:config:set security.invitation_token="XXX"

Functions autorizations:
https://console.cloud.google.com/functions/list?project=roles-app-37879

Firebase emulator UI:
firebase emulators:start
http://localhost:4000/
