# Guide d'Intégration Backend Python

## Vue d'ensemble

L'application React communique avec un backend Python via des requêtes HTTP (REST API).
Le frontend envoie des données JSON et reçoit des réponses JSON.

---

## Architecture Actuelle (Frontend uniquement)

Actuellement, toutes les données sont en dur dans `src/config.js` :

- Utilisateurs
- Publications
- Hiérarchie organisationnelle

Ces données doivent venir du backend Python normalement tu comprend

---

## Endpoints Nécessaires (à créer côté backend)

### 1. **POST /login**

**Description** : Authentifier un utilisateur

**Requête (depuis React)** :

```json
{
  "username": "fondateur",
  "password": "password123"
}
```

**Réponse (du backend)** :

```json
{
  "success": true,
  "userAdn": "1",
  "userName": "Fondateur A21",
  "role": "Fondateur",
  "token": "jwt_token_ici"
}
pour info j'ignore toujours comment tu compte utiliser les chemins
estc eque tu garde le systeme de 1 , 1.A, 1.A.C etc ou tu on a une autre tu pourra ajuster
```

**Où ça sera utilisé** : `src/pages/LoginPage.jsx`

---

### 2. **GET /users/{adn}**

**Description** : Récupérer les infos d'un utilisateur spécifique

**Requête (depuis React)** :

```
GET http://backend.com/users/1 le 1 represente l'ADN du CEO ou PDJ
Header: Authorization: Bearer {token}
```

**Réponse (du backend)** :

```json
{
  "adn": "1",
  "name": "Fondateur A21",
  "role": "Fondateur",
  "nationality": "🇫🇷",
  "status": "active"
}
n'oublie pas la fonctionnalite pour affciher la nationalite si il  faut telacharger ou le prmouve dans la base de donnée
```

**Où ça sera utilisé** : `src/components/RightPanel.jsx` (affiche le profil) sur grand ecran normalemant sur petit ecran on vas directmetent sur son profil on appuyant sur la premiere icon en partant de la droite

---

### ⚠️ Question IMPORTANTE sur les Nationalités

**Comment veux-tu gérer les nationalités ?**

**Option 1** : Stocker le code pays (ex: "FR", "CD", "GA", etc.)

```json
{
  "adn": "1.A.1",
  "name": "Anna P",
  "nationality": "FR"
}
```

→ Le **frontend** convertit "FR" en emoji 🇫🇷

**Option 2** : Stocker directement l'emoji du drapeau

```json
{
  "adn": "1.A.1",
  "name": "Anna P",
  "nationality": "🇫🇷",
  "flagEmoji": "🇫🇷"
}
```

→ Le **backend** fournit l'emoji, le frontend l'affiche directement

**Option 3** : Stocker les deux

```json
{
  "adn": "1.A.1",
  "name": "Anna P",
  "countryCode": "FR",
  "flagEmoji": "🇫🇷"
}
```

**Quelle approche préfères-tu ? tu me previens quand tu choisi !**

Les drapeaux doivent apparaître partout : organigramme, RightPanel, cartes de membre, etc.

---

### 3. **GET /publications**

**Description** : Récupérer toutes les publications visibles pour l'utilisateur connecté

**Requête (depuis React)** :

```
GET http://backend.com/publications?userAdn=1
Header: Authorization: Bearer {token}
```

**Réponse (du backend)** :

```json
{
  "publications": [
    {
      "id": 1,
      "author": "A21 MEDIA",
      "text": "Le momento de Cotonou/Benin...",
      "image": "url_image",
      "timestamp": "11h",
      "likes": 0,
      "comments": 0,
      "visibility": "publique",
      "visibilityLabel": "Global",
      "authorAdn": "1" " 1 c'est la lignée du president"
    },
    { ... }
  ]
}
```

**Où ça sera utilisé** : `src/pages/FilActualite.jsx` (fil d'actualité)

---

### 4. **GET /organization**

**Description** : Récupérer l'arborescence organisationnelle complète

**Requête (depuis React)** :

```
GET http://backend.com/organization?userAdn=1
Header: Authorization: Bearer {token}
```

**Réponse (du backend)** :

```json
{
  "treeData": {
    "adn": "1",
    "name": "Fondateur A21",
    "role": "Fondateur",
    "children": [
      {
        "adn": "1.A",
        "name": "Gérant A",
        "role": "Gérant",
        "children": [
          {
            "adn": "1.A.1",
            "name": "Leader A.1",
            "role": "Leader",
            "children": []
          },
          { ... }
        ]
      },
      { ... }
    ]
  },
  "stats": {
    "totalSubordinates": 25,
    "activeMembers": 20,
    "inactiveMembers": 5  " comme tu l'avais dis on pourra le supprimer si les stats ne  pas importants"
  }
}
```

**Où ça sera utilisé** : `src/pages/Organization.jsx` (organigramme)

---

## Flux d'authentification

### Étape 1 : Login

1. Utilisateur remplit le formulaire (`LoginPage.jsx`)
2. React envoie POST `/login` avec username + password
3. Backend valide et retourne `userAdn` + `token`
4. React sauvegarde `userAdn` et `token` dans `localStorage`

### Étape 2 : Requêtes suivantes

1. Pour chaque requête API, React ajoute le header : `Authorization: Bearer {token}`
2. Backend valide le token et retourne les données
3. Si le token est expiré → renvoyer une erreur 401 → redirection login

---

## Format des Tokens

**Type** : JWT (JSON Web Token)

**Utilisation** :

```
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Gestion des Erreurs

Le backend doit retourner les codes HTTP appropriés :

| Code | Signification    | Action Frontend           |
| ---- | ---------------- | ------------------------- |
| 200  | Succès           | Traiter les données       |
| 400  | Requête invalide | Afficher erreur           |
| 401  | Non authentifié  | Rediriger vers login      |
| 403  | Accès refusé     | Afficher message d'erreur |
| 500  | Erreur serveur   | Afficher message d'erreur |

**Format d'erreur** :

```json
{
  "success": false,
  "message": "Username ou password incorrect"
}
```

---

## Configuration côté Frontend

### Fichier à créer : `src/config.api.js`

```javascript
// URL de base du backend
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

// Endpoints
export const API_ENDPOINTS = {
  LOGIN: "/login",
  USERS: "/users",
  PUBLICATIONS: "/publications",
  ORGANIZATION: "/organization",
};

// Exemple d'utilisation :
// fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, { ... })
```

### Variable d'environnement

"environnement vistuel"
Créer un fichier `.env` :

```
REACT_APP_API_URL=http://localhost:5000
```

---

## Checklist pour le Backend Python

- [ ] Créer endpoint `POST /login`
- [ ] Créer endpoint `GET /users/{adn}`
- [ ] Créer endpoint `GET /publications`
- [ ] Créer endpoint `GET /organization`
- [ ] Implémenter JWT pour les tokens
- [ ] Ajouter middleware pour valider les tokens
- [ ] Implémenter la logique de visibilité des publications (basée sur l'ADN)
- [ ] Ajouter CORS pour permettre les requêtes depuis React "tres important sinon tu aura une erreur CORS"
- [ ] Documenter les erreurs retournées

---

## Exemple : Logique de Visibilité (Backend)

Quand un utilisateur demande les publications, le backend doit filtrer basé sur son ADN :

```
Publication avec visibility = "publique"
  → Visible pour TOUS

Publication avec visibility = "branche" et authorAdn = "1.A"
  → Visible pour : 1 (parent), 1.A (auteur), 1.A.1, 1.A.2, etc. (enfants)

Publication avec visibility = "prive" et authorAdn = "1.A.1"
  → Visible UNIQUEMENT pour : 1 (grand-parent), 1.A (parent), 1.A.1 (auteur)
```

---
