# Rolebase.io

**[Rolebase](https://rolebase.io)** is the online headquarter for [liberated companies](https://en.wikipedia.org/wiki/Liberated_company).

It's an open source SaaS that helps various organizations implement Holacracy, Sociocracy and other forms of governance.

## Install

1.  Install npm dependencies in webapp and functions

        npm i
        cd functions
        npm i

2.  Install Nhost CLI (https://docs.nhost.io/platform/overview/get-started-with-nhost-cli)

        sudo curl -L https://raw.githubusercontent.com/nhost/cli/main/get.sh | bash

3.  Log in to Nhost

        nhost login

4.  Check webapp config: `settings.ts`

5.  Check functions config: `functions/settings.ts` & `functions/.env`

    - **MAILJET_PUBIC_KEY**: Secret token. You can generate a token with Lastpass for example
    - **MAILJET_PRIVATE_KEY**: MailJet public key. You can find it here: https://app.mailjet.com/account/api_keys
    - **SECURITY_INVITATION_TOKEN**: MailJet private key
    - **ALGOLIA_APP_ID**: Algolia application ID
    - **ALGOLIA_SEARCH_API_KEY**: Algolia search API key (must remain secret!)
    - **ALGOLIA_ADMIN_API_KEY**: Algolia admin API key (must remain secret!)

### Algolia

To use the search engine across an organization, you need to configure an Algolia index.

1. Create an Algolia application

2. Create an index and import config:

   - Click "Manage index"
   - Click "Import Configuration"
   - Use `algolia-docs.json` present in this repo
   - Set env variables (see previous section)

## Start dev environment

1.  Launch Nhost:

        nhost dev

2.  Run webapp with Vite + Codegen watcher:

        npm run dev

3.  Open in browser: http://localhost:3000

## Upgrade Nhost

1.  First, stop Nhost:

        nhost down

2.  Upgrade Nhost CLI:

        sudo nhost upgrade

3.  Upgrade package `@nhost/nhost-js`.

## Storybook

You can preview and test some components in Storybook.

        npm run storybook

## Email templates

### Nhost emails

Email templates for Nhost are defined in `nhost/emails` folder.

They must be translated in french and english.

We're using MJML templates to generate HTML templates.

VSCode extension "MJML" is useful to get syntax highlighting and export to HTML:
https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml

### Mailjet templates

All other templates are defined in the Mailjet interface.

## Production env

[OVH](https://www.ovh.com/manager/#/web/domain/rolebase.io/zone)

- DNS

[Render.com](https://render.com)

- Front (static)
- Collab (Node + y-websocket)

[Nhost.io](https://nhost.io)

- Auth
- Database
- GraphQL API
- Storage
- Functions
