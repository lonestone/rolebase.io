# Rolebase.io

**[Rolebase](https://rolebase.io)** is the online headquarter for [liberated companies](https://en.wikipedia.org/wiki/Liberated_company).

It's an open source SaaS that help various organizations to implement Holacracy, Sociocracy and other forms of governance.

## Install

1.  Install npm dependencies in webapp and functions

        npm i
        cd functions
        npm i

2.  Install Firebase CLI

        npm i -g firebase-tools

3.  Check `settings.ts` file

4.  Fetch functions config to `.runtimeconfig.json`

        npm run get-config

## Start dev environment

1.  Run webapp with Vite in terminal #1:

        npm run dev

2.  Compile and watch functions in terminal #2:

        cd functions
        npm run watch

3.  Run Firebase Emulator in terminal #3:

        npm run firebase:emulator

4.  Open in browser:

    Webapp: http://localhost:3000

    Firebase Emulator UI : http://localhost:4000/

## Deploy

### Deploy webapp

Just push on the main branch 😉

It will be compiled then hosted on Firebase Hosting.

### Deploy Firestore rules

Push `firestore.rules` file in production

    firebase deploy --only firestore:rules

### Deploy Firestore indexes

Push `firestore.indexes.json` file in production

    firebase deploy --only firestore:indexes

### Deploy Storage rules

Push `storage.rules` file in production

    firebase deploy --only storage:rules

### Deploy Functions

Compile functions and push in production

    firebase deploy --only functions

## Import Firebase config in project

### Import Firestore rules

    firebase firestore:indexes > firestore.indexes.json

### Import Functions config to `.runtimeconfig.json`

        npm run get-config

## Functions Config

To push config from `.runtimeconfig.json` to production

    npm run set-config

To push a key in production:

    firebase functions:config:set mailjet.private="XXX"

Config keys:

- **security.invitation_token**: Secret roken. You can generate a token once, with Lastpass for example
- **mailjet.public**: MailJet public key. You can find it here: https://app.mailjet.com/account/api_keys
- **mailjet.private**: MailJet private key
