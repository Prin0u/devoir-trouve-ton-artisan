CREATE TABLE tmp_artisan (
    nom VARCHAR(255),            -- Nom de l'artisan ou de l'entreprise
    specialite VARCHAR(100),      -- Nom de la spécialité
    note DECIMAL(2,1),            -- Note sur 5 étoiles
    ville VARCHAR(100),            -- Ville
    a_propos TEXT,                 -- Description / à propos de l'artisan
    email VARCHAR(255),            -- Email de contact
    site_web VARCHAR(255),         -- Site web (optionnel)
    categorie VARCHAR(100),        -- Nom de la catégorie
    top BOOLEAN                    -- Artisan du mois (TRUE/FALSE)
);

/**
* Table categorie
* Contient les catégories principales d'artisanat dans la région.
* Exemple : Bâtiment, Services, Fabrication, Alimentation.
*/

CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

/**
* Table specialite
* Contient les spécialités d'artisanat rattachées à une catégorie.
* Chaque spécialité appartient à une catégorie et peut regrouper plusieurs artisans.
*/

CREATE TABLE specialite (
    id_specialite INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);

/**
* Table artisans
* Contient les informations détaillées sur chaque artisan.
* Chaque artisan appartient à une seule spécialité.
*/

CREATE TABLE artisan (
    id_artisan INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    id_specialite INT NOT NULL,
    note DECIMAL (2,1),
    ville VARCHAR(100),
    a_propos TEXT,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    top BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)
);

