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

For Rolebase's notifications system, we are using an open source service : [**Novu**](https://novu.co/)

Novu lets you choose between :

- using their cloud
- self-hosting your Novu

On Rolebase, we are using Novu cloud.  
Steps for Novu cloud :

1. Create an account on Novu : https://web.novu.co/auth/signup
2. Follow the _Quick Start Guide_, where you should :

   1. Configure your providers in the "Integration Store" page
      - Currently we only use : In-App, Email
   2. Build notification workflows :

   | Identifier         | Channels      | Workflow                          | Template                                                                                                                                        | Variables                                                                                                                                                                                                                                                                 |
   | ------------------ | ------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | meetingstarted     | In-App, Email | Trigger > In-App > Email          | In-App : `docs` > `notifications` > `in-app-templates` > `Simple.hbs`<br> Email : `docs` > `notifications` > `email-templates` > `Simple.mjml`  | In-App : _title_ , _content_, _actionUrl_ <br> Email : _title_ , _content_, _actionUrl_ _notificationReceived_, _actionButton_, _automaticEmail_, _unsubscribe_, _appUrl_                                                                                                 |
   | meetinginvited     | In-App, Email | Trigger > In-App > Email          | In-App : `docs` > `notifications` > `in-app-templates` > `Simple.hbs` <br> Email : `docs` > `notifications` > `email-templates` > `Simple.mjml` | In-App : _title_ , _content_, _actionUrl_ <br> Email : _title_ , _content_, _actionUrl_ _notificationReceived_, _actionButton_, _automaticEmail_, _unsubscribe_, _appUrl_                                                                                                 |
   | taskassigned       | In-App, Email | Trigger > In-App > Email          | In-App : `docs` > `notifications` > `in-app-templates` > `Simple.hbs` <br> Email : `docs` > `notifications` > `email-templates` > `Simple.mjml` | In-App : _title_ , _content_, _actionUrl_ <br> Email : _title_ , _content_, _actionUrl_ _notificationReceived_, _actionButton_, _automaticEmail_, _unsubscribe_, _appUrl_                                                                                                 |
   | thread             | In-App, Email | Trigger > In-App > Email          | In-App : `docs` > `notifications` > `in-app-templates` > `Simple.hbs` <br> Email : `docs` > `notifications` > `email-templates` > `Simple.mjml` | In-App : _title_ , _content_, _actionUrl_ <br> Email : _title_ , _content_, _actionUrl_ _notificationReceived_, _actionButton_, _automaticEmail_, _unsubscribe_, _appUrl_                                                                                                 |
   | tempthreadactivity | In-App, Email | Trigger > Digest > In-App > Email | In-App : `docs` > `notifications` > `in-app-templates` > `Digest.hbs` <br> Email : `docs` > `notifications` > `email-templates` > `Digest.mjml` | In-App : _title_ , _content_, _digestContentSingular_, _digestContentPlural_, _actionUrl_ <br> Email : _title_ , _content_, _digestContentSingular_, _digestContentPlural_, _actionUrl_ _notificationReceived_, _actionButton_, _automaticEmail_, _unsubscribe_, _appUrl_ |

3. Use your account API keys in your environment variables :
   - `NOVU_APP_ID` : Novu dashboard (https://web.novu.co) > Settings > API Keys > **_Application Identifier_**
   - `NOVU_API_KEY` : Novu dashboard (https://web.novu.co) > Settings > API Keys > **_API Key_**

More :

- Notification templates : check templates used for Rolebase (`docs` > `notifications`).
- Notification template variables : check notification's payload to know which ones to pass (`functions` > `utils` > `notification` > `notificationPayloadBuilder.ts`).

If you want to learn more about Novu, here is their [documentation](https://docs.novu.co/).  
If you want to self-host Novu, here is their [Docker deployment documentation](https://docs.novu.co/overview/docker-deploy).

_FYI : Due to Novu still being in Beta, a lot of things are likely to change._

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

## Contributions

Any pull request is welcome to be submitted on this Github project!

Before committing, please:

- Check diff to avoid superfluous changes: `git diff`
- Check typing: `npm run tsc`
- Check linting: `npm run lint`
- Check Migrations:
  - Keep migrations simple and safe, always test them
  - Squash migrations: https://hasura.io/docs/latest/hasura-cli/commands/hasura_migrate_squash/
  - Don't edit a commited migration

Before sending your pull request, please:

- Rebase: `git fetch origin main:main && git rebase main`
- Explain what you're doing and why

## Help & issues

If you're having an issue with Rolebase, feel free to [contact us](https://www.rolebase.io/contact) or to open an issue on this Github project.
