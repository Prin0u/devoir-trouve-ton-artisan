import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/Artisans.scss";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");
  const categorie = queryParams.get("categorie");

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/artisans");
        const data = await res.json();

        let filtered = data;
        if (search) {
          filtered = filtered.filter((artisan) =>
            artisan.nom.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (categorie) {
          filtered = filtered.filter(
            (artisan) => artisan.Specialite?.Categorie?.nom === categorie
          );
        }

        setArtisans(filtered);
      } catch (error) {
        console.error("Erreur lors du chargement des artisans :", error);
      }
    };

    fetchArtisans();
  }, [search, categorie]);

  return (
    <div className="container my-5 artisans-page">
      <Helmet>
        <title>Liste des artisans | Trouve ton artisan</title>
        <meta
          name="description"
          content="Consultez la liste complète des artisans. Recherchez par nom ou catégorie pour trouver un professionnel près de chez vous."
        />
      </Helmet>

      <h1 className="text-center mb-4">Liste des artisans</h1>

      <div className="row g-4">
        {artisans.length === 0 && (
          <p className="text-center">
            Aucun artisan trouvé pour cette recherche.
          </p>
        )}

        {artisans.map((artisan) => {
          const note = parseFloat(artisan.note) || 0;

          return (
            <Link
              to={`/artisan/${artisan.id_artisan}`}
              className="text-decoration-none col-12 col-md-4"
              key={artisan.id_artisan}
            >
              <div className="card shadow-sm h-100 artisan-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{artisan.nom}</h5>
                  <p className="card-text mb-2">
                    <strong>Spécialité :</strong>{" "}
                    {artisan.Specialite?.nom || "—"} <br />
                    <strong>Ville :</strong> {artisan.ville || "—"}
                  </p>
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
