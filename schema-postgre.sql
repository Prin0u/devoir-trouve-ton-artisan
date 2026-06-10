-- ===========================================
-- Table temporaire des artisans (import brut)
-- ===========================================
CREATE TABLE tmp_artisan (
    nom VARCHAR(255),            
    specialite VARCHAR(100),   
    note NUMERIC(2,1),            
    ville VARCHAR(100),           
    a_propos TEXT,              
    email VARCHAR(255),          
    site_web VARCHAR(255),        
    categorie VARCHAR(100),       
    top BOOLEAN                   
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
    note NUMERIC(2,1) CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100),
    a_propos TEXT,
    email VARCHAR(255) NOT NULL UNIQUE,
    site_web VARCHAR(255),
    top BOOLEAN DEFAULT FALSE
);
