import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/Artisans.scss";
import { supabase } from "../supabaseClient";

function Artisans() {
  // State pour stocker la liste des artisans récupérée depuis l'API
  const [artisans, setArtisans] = useState([]);

  // useLocation permet de récupérer l'URL actuelle et ses paramètres de query
  const location = useLocation();

  // Récupération des paramètres 'search' et 'categorie' dans l'URL
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search"); // Recherche par nom
  const categorie = queryParams.get("categorie"); // Filtrage par catégorie

  useEffect(() => {
    // Fonction asynchrone pour récupérer les artisans depuis l'API
    const fetchArtisans = async () => {
      try {
        // Construction de la requête Supabase
        let query = supabase
          .from("artisan")
          .select("*, specialite(nom, categorie(nom))");

        // Filtrage par nom côté Supabase
        if (search) query = query.ilike("nom", `%${search}%`);

        const { data, error } = await query;
        if (error) throw error;

        // Filtrage par catégorie côté client
        let filtered = data;
        if (categorie) {
          filtered = data.filter(
            (artisan) => artisan.specialite?.categorie?.nom === categorie
          );
        }

        // Mise à jour du state avec la liste filtrée
        setArtisans(filtered);
      } catch (error) {
        // Gestion des erreurs lors de l'appel à l'API
        console.error("Erreur lors du chargement des artisans :", error);
      }
    };

    // Appel de la fonction fetchArtisans à chaque changement de search ou categorie
    fetchArtisans();
  }, [search, categorie]);

  return (
    <div className="container my-5 artisans-page">
      {/* Helmet permet de définir dynamiquement le titre et la meta description de la page */}
      <Helmet>
        <title>Liste des artisans | Trouve ton artisan</title>
        <meta
          name="description"
          content="Consultez la liste complète des artisans. Recherchez par nom pour trouver un professionnel près de chez vous."
        />
      </Helmet>

      <h1 className="text-center py-5">Liste des artisans</h1>

      <div className="row g-4">
        {/* Message si aucun artisan ne correspond aux filtres */}
        {artisans.length === 0 && (
          <p className="text-center">
            Aucun artisan trouvé pour cette recherche.
          </p>
        )}

        {/* Boucle sur la liste des artisans pour afficher chaque card */}
        {artisans.map((artisan) => {
          const note = parseFloat(artisan.note) || 0;

          return (
            // Link permet de naviguer vers la fiche détaillée de l'artisan
            <Link
              to={`/artisan/${artisan.id_artisan}`}
              className="text-decoration-none col-12 col-md-4"
              key={artisan.id_artisan}
            >
              <div className="card shadow-sm h-100 artisan-card">
                <div className="card-body d-flex flex-column">
                  {/* Nom de l'artisan */}
                  <h5 className="card-title">{artisan.nom}</h5>

                  {/* Spécialité et localisation */}
                  <p className="card-text mb-2">
                    <strong>Spécialité :</strong>{" "}
                    {artisan.specialite?.nom || "—"} <br />
                    <strong>Localisation :</strong> {artisan.ville || "—"}
                  </p>

                  {/* Section pour afficher les étoiles de la note */}
                  <div className="mt-auto">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((i) => {
                        const filled = i <= Math.floor(note);
                        const half = !filled && i - 0.5 <= note;

                        return (
                          <span
                            key={i}
                            className={`star ${
                              filled ? "filled" : half ? "half" : ""
                            }`}
                          >
                            ★
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Artisans;
