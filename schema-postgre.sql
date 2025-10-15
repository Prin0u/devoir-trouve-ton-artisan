-- ===========================================
-- Table temporaire des artisans (import brut)
-- ===========================================
CREATE TABLE tmp_artisan (
    nom VARCHAR(255),             -- Nom de l'artisan ou de l'entreprise
    specialite VARCHAR(100),      -- Nom de la spécialité
    note NUMERIC(2,1),            -- Note sur 5 étoiles
    ville VARCHAR(100),           -- Ville
    a_propos TEXT,                -- Description / à propos de l'artisan
    email VARCHAR(255),           -- Email de contact
    site_web VARCHAR(255),        -- Site web (optionnel)
    categorie VARCHAR(100),       -- Nom de la catégorie
    top BOOLEAN                   -- Artisan du mois (TRUE/FALSE)
);

-- ===========================================
-- Table des catégories
-- ===========================================
CREATE TABLE categorie (
    id_categorie SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- ===========================================
-- Table des spécialités
-- ===========================================
CREATE TABLE specialite (
    id_specialite SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    id_categorie INTEGER NOT NULL REFERENCES categorie(id_categorie)
        ON DELETE CASCADE
);

-- ===========================================
-- Table des artisans
-- ===========================================
CREATE TABLE artisan (
    id_artisan SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    id_specialite INTEGER NOT NULL REFERENCES specialite(id_specialite)
        ON DELETE CASCADE,
    note NUMERIC(2,1),
    ville VARCHAR(100),
    a_propos TEXT,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    top BOOLEAN DEFAULT FALSE
);
