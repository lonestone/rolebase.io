# Plan : CMS agent-first pour le site Rolebase

Ce plan décrit les étapes pour remplacer TinaCMS par un CMS agent-first dans ce projet, qui servira de test avant d'en extraire un boilerplate.

## Phase 1 : Retirer TinaCMS

### 1.1 Supprimer les fichiers TinaCMS

- Supprimer le dossier `tina/` (config.ts, claude-screen.tsx, claude-server.mjs, __generated__/, tina-lock.json)
- Supprimer `public/admin/` (index.html généré par TinaCMS)
- Garder le patch `patches/iconsax-astro+0.0.2.patch` (iconsax-astro est utilisé dans le projet)

### 1.2 Nettoyer les dépendances

- Retirer `tinacms` et `@tinacms/cli` de package.json
- Retirer `react-icons` si plus utilisé ailleurs (vérifier les imports dans src/)
- Retirer tout script lié à TinaCMS dans package.json (`tinacms dev`, `tinacms build`)
- Simplifier le script `dev` : `astro dev` uniquement
- Simplifier le script `build` : `astro build` uniquement
- `npm install` pour nettoyer le lockfile

### 1.3 Vérifier que le site fonctionne

- Le build Astro doit passer sans TinaCMS
- Les collections de contenu Astro sont indépendantes de TinaCMS, rien ne devrait casser
- Vérifier qu'aucun import de `tina` ne traîne dans `src/`

## Phase 2 : Backend de l'agent

### 2.1 Serveur CMS minimal

- Créer un dossier `cms/` à la racine du site
- Serveur **Hono** (TypeScript) qui expose une API REST :
  - `POST /api/prompt` : envoie un prompt à Claude, stream la réponse en SSE (Hono a un helper `streamSSE` natif)
  - `GET /api/tree` : retourne l'arborescence du contenu (`src/content/`)
  - `GET /api/file?path=...` : retourne le contenu d'un fichier
  - `GET /api/git/status` : retourne le git status (fichiers modifiés, diff)
  - `POST /api/git/commit` : commit + push les changements
  - `POST /api/git/discard` : discard les changements d'un fichier
- Exécuté avec `tsx` (TypeScript sans build) via `@hono/node-server`
- Le serveur tourne sur un port dédié (ex: 4001)
- En production, le backend sert aussi le front du CMS (buildé dans `cms/dist/`)

### 2.4 Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `CMS_PORT` | Port du backend CMS | `4001` |
| `CMS_PASSWORD` | Mot de passe pour accéder à l'interface (production) | aucun (pas d'auth en dev) |
| `ASTRO_DEV_URL` | URL du dev server Astro (pour le bouton preview) | `http://localhost:4321` |
| `CONTENT_DIR` | Chemin vers le dossier de contenu | `src/content` |
| `GIT_REPO_URL` | URL du repo Git (HTTPS, pour push) | détecté depuis le remote `origin` |
| `GIT_PAT` | Personal Access Token GitHub (production, pour push HTTPS) | aucun (utilise les credentials locales en dev) |
| `GIT_BRANCH` | Branche de travail | `main` |

Pas de variable pour Claude Code CLI : il utilise l'authentification de la session (`~/.claude/`).

### 2.2 Intégration Claude Code CLI

- Réutiliser le principe de `tina/claude-server.mjs` : spawn `claude` en sous-processus
- Flags : `--dangerously-skip-permissions`, `--output-format stream-json`, `--verbose`
- Claude charge automatiquement les fichiers `CLAUDE.md` du projet (structure, conventions, composants disponibles)
- Stream SSE vers le frontend pour afficher la progression en temps réel
- **Gestion de l'authentification Claude** :
  - Au démarrage du serveur, vérifier que `claude` est authentifié (spawn test ou check `~/.claude/`)
  - Si non authentifié, lancer `claude` qui retourne une URL d'auth OAuth
  - Exposer l'état d'auth via `GET /api/claude/status` (authenticated / needs_auth)
  - Si auth nécessaire, le frontend affiche l'URL d'auth à ouvrir dans le navigateur
  - Une fois le token collé / l'auth complétée, le statut passe à authenticated
  - En production (Docker), cette étape se fait au premier lancement du container

### 2.3 Catalogue de composants (bonus, itératif)

- Script qui scanne `src/components/` et extrait les composants Astro avec leurs props (parsing du frontmatter script)
- Résultat exposé via `GET /api/components`

## Phase 3 : Interface web

### 3.1 Stack technique

- React avec Vite
- Tailwind CSS pour le style
- Le front est buildé dans `cms/dist/` et servi par le backend Hono en production
- En dev, Vite tourne en parallèle avec HMR
- Accessible sur le port du backend CMS (ex: `http://localhost:4001`)

### 3.2 Layout principal

Trois zones :

1. **Sidebar gauche** : arborescence du contenu (`src/content/`), organisée par collection. Cliquer sur un fichier l'ouvre au centre
2. **Zone centrale** : édition du contenu via **MDXEditor** (`@mdxeditor/editor`), médias de la page, formulaire frontmatter. Bouton pour ouvrir la preview dans un nouvel onglet (pointe sur le dev server Astro)
3. **Panneau droit (rétractable)** : mode discussion avec Claude. Prompt + sortie de l'agent en temps réel

### 3.3 Panneau agent (droite)

- Rétractable pour laisser toute la place à l'édition
- Champ texte avec Cmd+Enter pour envoyer
- Affichage en temps réel de la sortie de Claude (stream SSE)
- Les actions de l'agent (fichiers édités, commandes) sont visibles
- Bouton pour arrêter l'agent en cours

### 3.4 Éditeur MDX

- **MDXEditor** (`@mdxeditor/editor`) : éditeur WYSIWYG React basé sur Lexical
- Architecture par plugins : headings, listes, liens, images, tables, code blocks, frontmatter, JSX
- **Plugin JSX** : enregistrer les composants du projet (`Callout`, `Button`, `EntityFields`...) via `JsxComponentDescriptor` avec leurs props typées. Permet l'édition inline des composants custom
- **Plugin frontmatter** : édition basique key-value. Pour les champs typés (date, image, select), construire un formulaire custom au-dessus
- Toggle source/WYSIWYG pour les cas avancés
- Les modifications sont sauvegardées dans le fichier MDX via l'API backend (`POST /api/file`)

### 3.5 Gestion Git

- Indicateur visuel des fichiers modifiés (badge sur l'arborescence)
- Vue diff : voir les changements par fichier avant de commiter
- Boutons : commit, discard par fichier, push
- Message de commit auto-généré ou éditable

### 3.6 Upload de médias

- Drag & drop d'images sur le panneau
- Le fichier est placé automatiquement dans le dossier de la page actuellement sélectionnée
- Le chemin relatif est copié dans le presse-papier ou inséré dans le prompt

## Phase 4 : Scripts et DX

### 4.1 Scripts package.json

```
"dev": "astro dev & tsx cms/server.ts",
"build": "astro build",
"cms": "tsx cms/server.ts"
```

### 4.2 Dev local

- `npm run dev` lance Astro + le serveur CMS
- L'interface CMS est accessible sur `http://localhost:4001`
- La preview pointe sur le dev server Astro (`http://localhost:4321`)
- Claude Code CLI doit être installé et authentifié sur la machine

## Phase 5 : Docker pour la production

### 5.1 Dockerfile

- Image basée sur Node.js
- Installe Claude Code CLI (`npm install -g @anthropic-ai/claude-code`)
- Copie le projet
- Expose le port du serveur CMS
- Entrypoint : lance le dev server Astro + le serveur CMS

### 5.2 Workflow de déploiement du contenu

1. L'utilisateur édite via l'interface CMS (qui tourne dans le Docker)
2. Claude modifie les fichiers MDX dans le repo
3. L'utilisateur review les changements dans l'interface (diff)
4. Commit + push depuis l'interface
5. La CI (Netlify/Vercel) détecte le push et rebuild le site statique

### 5.3 Authentification

- L'interface CMS est protégée par mot de passe (`CMS_PASSWORD`). Page de login simple, session cookie
- Le push Git utilise le PAT (`GIT_PAT`) via HTTPS pour éviter de configurer des clés SSH dans le container
- L'abonnement Claude Code doit être authentifié dans le container

## Phase 6 : Extraction en boilerplate (après validation)

Une fois le CMS validé sur le site Rolebase :

- Extraire le dossier `cms/` en package indépendant
- Créer un template Astro minimal avec la structure de contenu, l'i18n, le CMS intégré
- Documenter l'installation et la configuration
- Publier en open source

## Ordre de priorité

| Étape | Priorité | Dépendances |
|-------|----------|-------------|
| 1. Retirer TinaCMS | Haute | Aucune |
| 2.1 Serveur CMS minimal | Haute | Phase 1 |
| 2.2 Intégration Claude CLI | Haute | 2.1 |
| 3.2-3.3 Layout + prompt | Haute | 2.1, 2.2 |
| 3.4 Éditeur MDX | Haute | 3.2 |
| 3.5 Gestion Git | Moyenne | 2.1, 3.2 |
| 3.6 Upload médias | Moyenne | 3.2 |
| 2.3 Catalogue composants | Basse | 2.1 |
| 4 Scripts et DX | Moyenne | 2.1 |
| 5 Docker production | Basse | Phase 2, 3, 4 |
| 6 Boilerplate | Basse | Phase 5 |
