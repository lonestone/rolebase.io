# Rolebase.io

**[Rolebase](https://rolebase.io)** is the online headquarter for [liberated companies](https://en.wikipedia.org/wiki/Liberated_company).

It's an open source SaaS that helps various organizations implement Holacracy, Sociocracy and other forms of governance.

## Install

### NPM dependencies

Install npm dependencies in webapp and functions

```
npm i
cd functions
npm i
```

### Nhost

Rolebase's backend is built with [Nhost](https://nhost.io). Follow these steps to set it up (MacOS, Linux):

1.  Create an account on nhost.io : https://app.nhost.io.

2.  Install Nhost CLI (https://docs.nhost.io/platform/overview/get-started-with-nhost-cli)

```
sudo curl -L https://raw.githubusercontent.com/nhost/cli/main/get.sh | bash
```

3.  If you don't have them already, install [Docker](https://www.docker.com/get-started) and [Git](https://git-scm.com/downloads)

4.  Log in to Nhost

Set up for Windows users :

1.  Download Ubuntu from Microsoft store or anywhere else where you can find it.

2.  Upgrade for WSL 2.

3.  On Ubuntu install git, nvm, npm and node (https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl).

4.  Clone project on Ubuntu environment and open project from Ubuntu terminal to VSCode.

5.  If Docker permissions got denied, follow this step to add new user : https://stackoverflow.com/questions/47854463/docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socke , also verify in docker desktop > settings > resources > WSL integration > Enable Ubuntu for wsl distro and apply.

```
nhost login
```

## Start dev environment

1.  Launch Nhost:

```
nhost dev
```

2.  Run webapp with Vite + Codegen watcher:

```
npm run dev
```

3.  Open in browser: http://localhost:3000

### Storybook

You can preview and test some components in Storybook.

```
npm run storybook
```

### Stop local server

Some nhost processes keep running in background after the first run. If you need to stop them, follow those steps:

1. Stop all dockers containers

```
docker stop $(docker ps -a -q)
```

2. Stop nhost

```
nhost down
```

## External services

### Mailjet

Rolebase uses [Mailjet](https://www.mailjet.com/) to send some of its mail. You will need an account to there to be able to use it. You can then import your private and public key to add them to Rolebase's configuration (see below).

### Algolia

To use the search engine across an organization, you need to configure an [Algolia](https://www.algolia.com/) index.

1. Create an Algolia application

2. Create an index and import config:

   - Click "Manage index"
   - Click "Import Configuration"
   - Use `algolia-docs.json` present in this repo
   - Set env variables (see below)

### Stripe

Rolebase also uses [Stripe](https://stripe.com/) for it's subscription feature.
You'll need to [install the cli](https://stripe.com/docs/stripe-cli#install) first.

Once done, run the following command:

```bash
stripe listen --forward-to http://localhost:1337/v1/functions/routes/stripeWebhook
```

It'll should output your [Stripe webhook endpoint secret](https://dashboard.stripe.com/test/webhooks).

### Novu

To send notifications to your organization's users, you need a [Novu](https://novu.co/) account.
You'll also need to create the notification in your Novu admin panel as you'll have to pass the notification identifier (triggerId) to send a notification.

## Configuration

### Function environment variables

Write these env variables in the file `functions/.env`:

- **SECURITY_INVITATION_TOKEN**: Secret token used to validate invitations. You can generate a token with Lastpass for example
- **MAILJET_PUBLIC_KEY**: MailJet public key. You can find it here: https://app.mailjet.com/account/api_keys
- **MAILJET_PRIVATE_KEY**: MailJet private key
- **ALGOLIA_APP_ID**: Algolia application ID
- **ALGOLIA_SEARCH_API_KEY**: Algolia search API key (must remain secret!)
- **ALGOLIA_ADMIN_API_KEY**: Algolia admin API key (must remain secret!)
- **NOVU_APP_ID**: Public application identifier provided by Novu
- **NOVU_API_KEY**: Secret API key provided by Novu
- **STRIPE_STARTUP_PLAN_PRICE_ID**: Price id of the startup plan inside stripe
- **STRIPE_ENDPOINT_SECRET**: [Stripe webhook endpoint secret](https://dashboard.stripe.com/test/webhooks)
- **STRIPE_PRIVATE_KEY**: [Stripe API private key](https://stripe.com/docs/keys#obtain-api-keys)

You can find a reusable template in `functions/.env.template`.

### Webapp config

Webapp configuration can be written in `settings.ts`:

- url: URL on which the webapp will be served
- websiteUrl: URL to redirect user to if they are not logged in
- nhost.subdomain: Subdomain of your nhost server
- nhost.region: Region of your nhost server
- functionsUrl: URL of your nhost instance, with the path to call the functions
- memberPicture.maxSize: Size (in px) in which your team's members icons will be displayed
- stripe.publicKey: [Stripe API public key](https://stripe.com/docs/keys#obtain-api-keys)

**Note:** This file also specifies configuration for local environment. You should not edit those (unless you know what you're doing).

### Server config

The server config is localized in `functions/_utils/settings.ts`. You can edit in it:

- url: URL of the webapp
- storageUrl: URL where your files will be stored
- mail.sender: Name and address to use in send mail

**Note:** Like previous configuration, do avoid editing values for local environment. You should also not edit configurations using environment variables those are to be configured in `.env`).

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
- Storybook (static)
- Collab (Node + y-websocket)

[Nhost.io](https://nhost.io)

- Auth
- Database
- GraphQL API
- Storage
- Functions

## Upgrade Nhost

1.  First, stop Nhost:

```
nhost down
```

2.  Upgrade Nhost CLI:

```
sudo nhost upgrade
```

3.  Upgrade package `@nhost/nhost-js`.
