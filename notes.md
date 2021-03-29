- budget temps et €
- heures dispo par membre
- heures allouées pour un membre dans un cercle
- congés
- avatar upload limit

# Workflows

Un workflow permet d'automatiser des tâches. Il peut utiliser les cercles, rôles et membres afin de réaliser des actions programmées dans le temps ou en réaction à un événement.

Un workflow est global et non propre à un cercle, de manière à pouvoir agir sur plusieurs cercles en même temps.

Idées d'utilisation :

- Daily standup
- One-to-one meetings with pseudo-random selection of binomes
- Code reviews with pseudo-random selection of binomes, same as one-to-one
- Recurrent reminder for a role
- Recurrent events with agenda sync and notification before to prepare
- Lunch for everyone, divided by groups
- Quarterly interviews between associate and employees

Idées de fonctionnalités :

- Récurrence
- Template de workflow

## Conditions

-

## Actions

- Attendre X secondes
- Sélectionner tous les membres directs ou indirects du cercle
- Sélectionner des membres au hasard
- Ajouter un événement dans l'agenda de membres
- Appeler un Zapier ou un IFTTT
- Envoyer un message sur Slack

## Examples

### Code reviews random

- Définir la liste d"ids de membres "Devs"
- Ajouter à la liste "Devs" les ids de membres du cercle "Agence > Développeur"
- Ajouter à la liste "Devs" les ids de membres du cercle "Studio > Développeur"
- Randomiser la liste "Devs"
-

```
    async function addOrgId() {
      const orgId = 'gPJFBHdKt4m63jMifYt3'
      const querySnapshot = await collection.get()
      querySnapshot.docs.forEach((doc) => {
        doc.ref.set({ orgId }, { merge: true })
      })
    }

    addOrgId()
```
