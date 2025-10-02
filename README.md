# Blagues API - Backend

Une API REST pour gérer et servir des blagues aléatoires, développée pour le projet de sélection Carambar & Co.

## 📋 Cahier des Charges

- [X] réaliser une **API versionnée**
- [X] environnement Node, Express, Sequelize & SQLite
- [X] Approche MVC
- [X] création de 4 endpoints :
  - [X] pour **ajouter** une blague en BDD 
  - [X] pour **consulter** toutes les blagues 
  - [X] pour **consulter** une blague 
  - [X] pour **consulter** une blague aléatoire
- [X] API documentée ([Swagger](https://swagger.io/))
- [ ] la partie FRONT doit être déployée via GitHub pages
- [ ] déploiement via [render.com](https://render.com/)
- [ ] **readme GitHub** avec les liens vers le repo API et Swagger
- [ ] livrables : 1 repo(GitHub) Front  & 1 repo(GitHub) Back

## 🚀 Déploiement

L'API est déployée sur Render.com :  
**URL de production** : [https://votre-api-blagues.onrender.com](https://votre-api-blagues.onrender.com)

## 📚 Documentation API

La documentation complète de l'API est disponible via Swagger :  
**Swagger UI** : [https://votre-api-blagues.onrender.com/api-docs](https://votre-api-blagues.onrender.com/api-docs)

## 🔧 Endpoints disponibles

### Version 1 de l'API

| Méthode | Endpoint                 | Description                     |
| ------- | ------------------------ | ------------------------------- |
| `GET`   | `/api/v1/blagues`        | Récupérer toutes les blagues    |
| `GET`   | `/api/v1/blagues/:id`    | Récupérer une blague par son ID |
| `GET`   | `/api/v1/blagues/random` | Récupérer une blague aléatoire  |
| `POST`  | `/api/v1/blagues`        | Ajouter une nouvelle blague     |

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
