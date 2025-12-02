# TODO

- Meetings: Réu récurrente privée
- Meeting : url visio invalide : https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZTIwMjViOWQtNzU4Zi00OGY1LTg5YjI[…]2c%22Oid%22%3a%226a1e6528-9eaa-421f-95d1-1f97f7ef05fa%22%7d
- En superadmin, on ne voit pas les cercles invités dans un cercle, par exemple https://rolebase.io/ifs-club-utilisateur/roles?circleId=5222b7ab-1356-4835-b892-b1354c9c570d
- Quand on clique sur un cercle invité, on est redirigé vers le cercle d'origine, il faudrait plutôt zoomer sur le cercle cliqué
- Fix accept invitation after signup (url changes and loses token)
- OTP to signin/signup?
- Fix asking for subscription when batch invitation
- Notif réu par mail
- Reponse auto demande de démo
- Bouton diag / prise de rdv (https://calendar.app.google/Y1mM2Lgc1FjzWFRYA)
- Notifs Slack
- Module gouvernance
- Module prise de décision
- Mettre un sujet en favori
- Feature Documentation
- Onboarding org creation:

  - Mode texte / Mode vocal
  - demander type de structure
  - Taille de la boîte
  - Comment ils nous ont connu ?
  - Attentes

- Add topics from another role in a meeting: prévenir Pierre Jothy et Mélanie (fablab chaux)

- Search : améliorer affichage des résultats de recherche
- Notif mail régulière aux leaders de cercle pour demander s'il faut mettre à jour
- Notif mail des rôles vacants aux leaders des cercles parents
- Séparer en plusieurs organigrammes
- Proposer des templates de cercles
- Graph : windowing of nodes
- App mobile
- Tips : connecter l'agenda, setup réu récurrentes
- Role : budgets
- Threads : proposer d'ajouter à la prochaine réunion lors de la création d'un sujet
- Meetings/Threads : pouvoir renommer directement un sujet
- Tasks/Meetings : impossible de bouger une card après avoir scrollé pendant le drag and drop si la liste est longue
- Meetings : afficher une alert dans la section tâche de réunion une fois celle-ci terminée pour indiquer qu'on peut retrouver les tâches en dehors de la réunion
- Task : input pour créer une tâche direct depuis le "+" dans une colonne
- Intégration Bigbluebutton
- Intégration Nextcloud (Akceli & Boscop + Oplibris)
- Pouvoir gérer les sous-rôles dans un sujet
- Import org from Linkedin company page
- Fix clic + réunion dans IFS
- Fix date invitation (en) dans fiche membre (IFS)
- Fix css print toggle participation réunion (poke Croix Rouge)
- Fix css print décisions en réunion (poke Croix Rouge)
- Fix insertion sujet privé avec invités (dont soi) (poke Croix Rouge)
- Fix rôles invités dans l'export image (poke Croix Rouge)
- Ajout localStorage/preference vue planning réunion (poke Croix Rouge)
- Fix rôles vacants contenant des rôles invités (poke Croix Rouge)
- Ajouter bouton Imprimer dans les options de Réunion
- Meetings: afficher icône lock dans le panneau de résumé quand c'est privé
- Meetings: création des steps dans la réunion plutôt que dans ses paramètres
- Marquer un sujet comme lu quand on a participé à la réunion qui le contient
- Threads: ne pas afficher les notes des réus supprimées
- Don't show seen threads in notif
- Remove org_subscription permission
- Do not index circles that have an archived parent
- Prevent base64 images in editor
- Warning quand on crée une réu sans être dedans
- Fix création occurrence réu depuis agenda. "Juste pour info, dans Rolebase, j’ai encore des réunions récurrente de feu le cercle Culture, et ainsi que du cercle RH auquel je n’appartient plus. Supprimer les réunions récurrentes de mon agenda ne suffit pas à les faire disparaitre, elles reviennent."

# Grands chantiers

- OKR
- Skills
- Doc
- Governance

Compétences (Evea)

- Niveaux
- Projections : évaluer les compétences manquantes pour prendre un certain rôle
  -> Septembre
  Concurrence avec Lucca

Rolebase

- Outil d’émulation
- Planfication et test
- Supervision
- Statistiques

Progress

- Inviter au moins 2 membres
- Mettre une photo à au moins 2 membres
- Créer 1 réunion récurrente
- Connecter une app calendar
- Connecter Slack

Doc

- raison d’être d’un rôle doit faire avancer la raison d’être du rôle parent
- un rôle avec leader a du sens quand on fait des réunions
- utiliser les représentants pour la gouvernance

Demandes de YesWeDev :

- Meilleure visu des décisions/politiques et de l’historique
- Pouvoir remplacer une décision par une autre et voir facilement les anciennes décisions.

Autres tâches :

- Fix (maybe) bouton d’édition qui apparaissent dans le rôle même quand on a pas les droits
- Show similar threads when creating a thread
- Delete <form> without props
- Paramètre de la visualisation par défaut
- Bug padding role invité dans l’organigramme quand il y a plusieurs membres représentant
- Améliorer le circle picking
- Fix: meetings notes, members descriptions and roles properties not transformed in search
- Private recurring meetings
- Supprimer role.singleMember ? Ou alors corriger drag and drop pour éviter d’avoir 2 membres dans un role en singleMember
- Acceptation des conditions lors de la première utilisation de l’IA
- Update calendars when change in circle members (meeting and recurring)
- Delete user_apps at archiveMember
- Modal generation role center au lieu de top
- Design emails digest sur Outlook (Windows)
- Disponibilité des invités dans l’agenda
- Création de réu depuis l’agenda
- Améliorer prompt résumé réunion
- Notif de création de réu (demandé par Nathalie)
- Indicateur notifs sujets dans la sidebar
- Ajouter couleurs status sur les icônes de threads dans la combobox
- Marquer comme lus les sujets déjà lus dans le digest
- Set email_verified to true when accepting invitation
- Améliorer lien entre rôles
- Ajouter un bouton « Réunion faite » lorsque la réu n’a pas été démarrée et que la date est passée
- Fin auto de réu
- Editeur focus gras/italic dans un tableau
- Fix thread scroll with logs and meeting notes
- Update lexical
- Ligatures dans l’éditeur
- Fix image in export
- Meilleur écran quand c’est vide (sujets, tâches)
- Fix scope sub-roles
- Erreur « Conflct » lorsqu’on essaie d’accepter une invitation une 2ème fois. Déconnecter user quand on supprime un membre.
- Afficher tâches dans les logs de réunion quand il n’y a pas d’étape tâches
- Bug overflow member content à cause du menu chakra
- Relations client/fournisseur
- Afficher « Machin a créé ce sujet » en haut d’un sujet
- README: diff role & circle
- Retravailler les checklists et faire une checklist personnelle à partir de ses rôles
- Privacy settings by role (documents and operations)
