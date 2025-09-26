/**
* Création de la table temporaire tmp_artisan
*/

CREATE TABLE tmp_artisan (
    nom VARCHAR(255),
    specialite VARCHAR(100),
    note DECIMAL (2,1),
    ville VARCHAR(100),
    a_propos TEXT,
    email VARCHAR(255),
    site_web VARCHAR(255),
    categorie VARCHAR(100),
    top BOOLEAN
);

/**
* Importer les données en .csv dans la table tmp_artisan
*/

/**
* Remplir la table categorie
*/

INSERT INTO categorie (nom)
SELECT DISTINCT categorie
FROM tmp_artisan;

/**
* Remplir la table specialite avec le bon id_categorie
*/

INSERT INTO specialite (nom, id_categorie)
SELECT DISTINCT tmp_artisan.specialite, categorie.id_categorie
FROM tmp_artisan tmp_artisan
JOIN categorie categorie ON tmp_artisan.categorie = categorie.nom

/**
* Remplir la table artisan avec le bon id_specialite
*/

INSERT INTO artisan (nom, id_specialite, note, ville, a_propos, email, site_web, top)
SELECT tmp_artisan.nom specialite.id_specialite, tmp_artisan.note, tmp_artisan.ville, tmp_artisan.a_propos, tmp_artisan.email, tmp_artisan.site_web, tmp_artisan.top
FROM tmp_artisan tmp_artisan
JOIN categorie categorie ON tmp_artisan.categorie = categorie.nom;

/**
* Supprimer la table temporaire
*/
DROP TABLE tmp_artisan;