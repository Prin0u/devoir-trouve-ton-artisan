import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Artisans.scss";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // On récupère le paramètre search depuis l'URL
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        let url = "http://localhost:5000/api/artisans";

        const res = await fetch(url);
        const data = await res.json();

        // Filtre par recherche si présente
        let filtered = data;
        if (search) {
          filtered = data.filter((artisan) =>
            artisan.nom.toLowerCase().includes(search.toLowerCase())
          );
        }

        setArtisans(filtered);
      } catch (error) {
        console.error("Erreur lors du chargement des artisans :", error);
      }
    };

    fetchArtisans();
  }, [search]);

  return (
    <div className="container my-5 artisans-page">
      <h1 className="text-center mb-4">Liste des artisans</h1>
      <div className="row g-4">
        {artisans.map((artisan) => (
          <div
            className="col-12 col-md-4"
            key={artisan.id_artisan}
            onClick={() => navigate(`/artisans/${artisan.id_artisan}`)}
            role="button"
          >
            <div className="card shadow-sm h-100 artisan-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{artisan.nom}</h5>
                <p className="card-text mb-2">
                  <strong>Spécialité :</strong> {artisan.Specialite?.nom || "—"}{" "}
                  <br />
                  <strong>Ville :</strong> {artisan.localisation || "—"}
                </p>
                <div className="mt-auto">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={s <= artisan.note ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {artisans.length === 0 && (
          <p className="text-center">
            Aucun artisan trouvé pour cette recherche.
          </p>
        )}
      </div>
    </div>
  );
}

export default Artisans;
