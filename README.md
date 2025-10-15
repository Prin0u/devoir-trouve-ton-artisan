# SITE WEB Trouve ton artisan

## Description du projet

Ce projet a été réalisé dans le cadre d'un devoir étudiant pour la région **Auvergne-Rhône-Alpes**
Il s'agit d'une plateforme permettant aux particuliers de trouver un artisan de la région, de consulter sa fiche et de le contacter via un formulaire.

Le projet inclut :

- Une **interface frontend** en ReactJS, responsive (mobile-first), utiliant Bootstrap et Sass.
- Une **API backend** en Node.js avec Express, interrogeant une base de données MySQL via Sequelize.
- Une **base de données MySQL** stockant les artisans, leurs spécialités et catégories.
- Une attention particulière portée à la **sécurité**, à l'accessibilité (norme WCAG 2.1)

## Pré-requis

Avant de lancer le projet, vous devez avoir installé :

- Node.js
- Node Package Manager (NPM)
- MySQL
- Git

## Installation

1. **Cloner le repository**

```bash
git clone https://github.com/Prin0u/devoir-trouve-ton-artisan
cd devoir-trouve-ton-artisan
```

2. **Installer les dépendances**

# Frontend

cd frontend
npm install

# Backend

cd ../backend
npm install

3. **Créer et remplir la base de données**

- Connectez vous à **MySQL** et exécutez le script de création des tables et importez `data.csv`:

  ```sql
  SOURCE schema.sql;

  LOAD DATA LOCAL INFILE 'data.csv'
  INTO TABLE Artisan
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;
  ```

4. **Configurer l'API**

Créer un fichier .env et y insérer :

DB_HOST=localhost
DB_USER=utilisateur
DB_PASSWORD=motdepasse
DB_NAME=trouve_artisan
PORT=5000

**Ne pas oublier de remplacer DB_USER et DB_PASSWORD par vos identifiants MySQL locaux.**

5. **Lancer l'application**

# Backend

cd backend
npm start

# Frontend

cd ../frontend
npm start
