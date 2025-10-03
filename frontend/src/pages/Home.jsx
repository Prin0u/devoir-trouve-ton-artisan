import React, { useEffect, useState } from "react";
import "../styles/Home.scss";

function Home() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artisans");
        const data = await res.json();

        // Uniquement les artisans avec top = 1
        const topArtisans = data.filter((artisan) => artisan.top === 1);
        setArtisans(topArtisans);
      } catch (error) {
        console.error("Erreur lors du chargement des artisans :", error);
      }
    };

    fetchArtisans();
  }, []);

  return (
    <div className="container my-5 home-page">
      {/* Titre principal */}
      <h1 className="text-center mb-4">Comment trouver un artisan ?</h1>

      {/* Les étapes */}
      <div className="row g-4 mb-5">
        {[
          "Choisir la catégorie d'artisanat dans le menu.",
          "Choisir un artisan.",
          "Le contacter via le formulaire de contact.",
          "Une réponse sera apportée sous 48h.",
        ].map((step, index) => (
          <div className="col-12 col-md-6 d-flex align-items-start" key={index}>
            <div className="circle">{index + 1}</div>
            <p className="mb-0">{step}</p>
          </div>
        ))}
      </div>

      {/* Artisans du mois */}
      <h2 className="text-center mb-4">Artisans du mois</h2>
      <div className="row g-4">
        {artisans.map((artisan) => (
          <div className="col-12 col-md-4" key={artisan.id_artisan}>
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
      </div>
    </div>
  );
}

export default Home;
