# Réflexions sur le CMS et l'avenir de l'édition de contenu

## Ce qui fonctionne bien aujourd'hui

Le contenu du site vit en MDX dans des collections Astro. Chaque page a son propre dossier avec ses versions par langue (`en.mdx`, `fr.mdx`) et ses médias co-localisés. Cette structure est claire, versionnable avec Git, et facilement éditable par des agents IA ou des humains.

## Le problème avec les CMS traditionnels

Les CMS headless classiques (Contentful, Sanity, Strapi...) imposent des contraintes fortes :

- Le contenu est enfermé dans une base de données, loin du code
- Les schémas de contenu sont rigides, définis à l'avance
- On perd la liberté du MDX : impossible d'importer un composant custom, de composer librement sa page
- L'édition visuelle reste limitée à des blocs prédéfinis
- On ajoute une dépendance externe, un hébergement, une API, de la latence
- Le workflow Git natif (branches, reviews, rollback) est perdu ou simulé artificiellement

## Le problème avec les agents IA seuls

Donner un prompt à un agent pour éditer du MDX fonctionne, mais sans interface :

- On manque de contrôle visuel sur le résultat
- On ne sait pas quels composants sont disponibles ni comment les utiliser
- Il faut connaître la structure du projet pour guider l'agent
- Les erreurs sont difficiles à repérer sans preview
- L'expérience est trop technique pour un non-développeur

## TinaCMS : la bonne direction, mais des limites

TinaCMS a le bon modèle mental : édition locale, contenu en fichiers, Git-native, preview en temps réel. Mais en pratique :

- Le support MDX est limité : les imports de composants custom sont mal gérés
- L'éditeur ne connaît pas les composants Astro disponibles dans le projet
- Les médias doivent être placés manuellement au bon endroit (dans le dossier de la page)
- L'interface est générique, pas optimisée pour un workflow de contenu précis
- Pas de place pour un agent IA dans le workflow d'édition

## Ce qu'il faudrait : un CMS agent-first pour Astro

L'idée serait un outil qui combine le meilleur des deux mondes : une interface visuelle minimale et un agent IA au centre du workflow d'édition.

### Principes

- **Le contenu reste en fichiers MDX**, dans le repo Git, avec la structure dossier/langue/médias existante
- **Pas de base de données**. Le filesystem est la source de vérité. Git est le versioning
- **L'agent IA est le moteur d'édition principal**. On prompte les modifications en langage naturel : "ajoute une section témoignages", "traduis cette page en français", "remplace l'image hero"
- **L'interface donne le contrôle visuel**. Preview live, arborescence du contenu, diff avant commit
- **Le système connaît le projet**. Il liste automatiquement les composants Astro disponibles, leurs props, leurs variantes. L'agent peut les utiliser sans qu'on lui explique

### Fonctionnalités clés

- **Prompt libre** : demander n'importe quelle modification de contenu en langage naturel
- **Catalogue de composants** : l'outil scanne le projet et expose les composants disponibles (Button, Callout, EntityFields...) avec leur documentation et leurs props
- **Placement intelligent des médias** : les images uploadées sont automatiquement placées dans le dossier de la page concernée
- **Preview live** : le dev server Astro tourne en arrière-plan, chaque modification est visible instantanément
- **Gestion i18n native** : créer/éditer les versions linguistiques côte à côte, demander à l'agent de traduire
- **Diff et commit** : visualiser les changements, commiter et pusher depuis l'interface

### Architecture

- **En mode dev (local)** : fonctionnement purement local et léger. Le dev server Astro tourne, l'agent édite les fichiers directement. Aucune dépendance externe
- **En production** : un seul container Docker qui embarque le dev server Astro, l'agent (la commande `claude` via un abonnement Claude Code) et l'interface web. Le site reste déployé en statique (ou hybride). Les modifications passent par commit/push Git, ce qui déclenche le build et le déploiement via la CI existante (Netlify, Vercel, etc.). L'avantage d'utiliser `claude` (Claude Code CLI) plutôt que l'API directement : on bénéficie de l'abonnement existant sans gérer de clé API ni de facturation à l'usage, et l'agent a déjà toutes les capacités d'édition de fichiers, de recherche dans le projet et d'exécution de commandes intégrées

### Format

Ça pourrait prendre la forme d'un **boilerplate / starter kit** :

- Un template Astro avec la structure de contenu, les collections, l'i18n déjà en place
- L'interface d'édition intégrée, accessible en dev
- La configuration Docker pour le déploiement du CMS en production
- Tout est open source, tout est forkable, tout est personnalisable

L'interface elle-même doit être **minimaliste et ultra-efficace** : pas de menus imbriqués, pas de formulaires à rallonge. Un arbre de contenu, une preview, un champ de prompt. L'essentiel.
