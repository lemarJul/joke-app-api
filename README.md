# Blagues API - Backend

Une API REST pour gérer et servir des blagues aléatoires, développée pour le projet de sélection Carambar & Co.

## 📋 Cahier des Charges

- [x] réaliser une **API versionnée**
- [x] environnement Node, Express, Sequelize & SQLite
- [x] Approche MVC
- [x] création de 4 endpoints :
  - [x] pour **ajouter** une blague en BDD
  - [x] pour **consulter** toutes les blagues
  - [x] pour **consulter** une blague
  - [x] pour **consulter** une blague aléatoire
- [x] API documentée ([Swagger](https://swagger.io/))
- [x] la partie FRONT doit être déployée via GitHub pages
- [x] déploiement via [render.com](https://render.com/)
- [x] **readme GitHub** avec les liens vers le repo API et Swagger
- [x] livrables : 1 repo(GitHub) Front & 1 repo(GitHub) Back

## 🚀 Déploiement

L'API est déployée sur Render.com :  
**URL de production** : [https://joke-app-api.onrender.com](https://joke-app-api.onrender.com)

    🚨 Attention : Render.com peut mettre en pause les services inactifs. Le redémarrage de l'API peut prendre jusqu'à 50 secondes, voire plus, après une période d'inactivité.

## 📚 Documentation API

La documentation complète de l'API est disponible via Swagger :  
**Swagger UI** : [https://joke-app-api.onrender.com/api/v1/docs](https://joke-app-api.onrender.com/api/v1/docs)

## 🔧 Endpoints disponibles

### Version 1 de l'API

| Méthode | Endpoint               | Description                     |
| ------- | ---------------------- | ------------------------------- |
| `GET`   | `/api/v1/jokes`        | Récupérer toutes les blagues    |
| `GET`   | `/api/v1/jokes/:id`    | Récupérer une blague par son ID |
| `GET`   | `/api/v1/jokes/random` | Récupérer une blague aléatoire  |
| `POST`  | `/api/v1/jokes`        | Ajouter une nouvelle blague     |
| `GET`   | `/api/v1/docs`         | Documentation Swagger           |

## 📦 Installation et développement

```bash
# Cloner le repository
git clone https://github.com/votre-username/nom-du-repo-backend.git

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start
```

## 🔗 Lien du Repository Front-End

Le code source du front-end est disponible sur GitHub :

[https://github.com/lemarJul/joke-app-client](https://github.com/lemarJul/joke-app-client)
