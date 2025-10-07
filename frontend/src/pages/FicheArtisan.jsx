import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import "../styles/ficheartisans.scss";

function FicheArtisan() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/artisans/${id}`);
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setArtisan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

  if (loading) return <p className="text-center">Chargement de la fiche...</p>;
  if (error) return <p className="text-center">{error}</p>;
  if (!artisan) return <p className="text-center">Aucun artisan trouvé.</p>;
  const note = parseFloat(artisan.note) || 0;

  return (
    <div className="container my-5 fiche-artisan">
      <Helmet>
        <title>{artisan.nom} | Fiche artisan | Trouve ton artisan</title>
        <meta
          name="description"
          content={`Découvrez ${artisan.nom}, ${
            artisan.Specialite?.nom || "artisan"
          } basé à ${
            artisan.ville || "une localisation inconnue"
          }. Contactez-le facilement via notre formulaire.`}
        />
      </Helmet>
      {/* Nom + image */}
      <h1 className="mb-4">{artisan.nom}</h1>
      {artisan.image && (
        <div className="text-center mb-4">
          <img
            src={artisan.image}
            alt={artisan.nom}
            className="img-fluid rounded"
          />
        </div>
      )}
      {/* Infos principales */}
      <div className="mb-4">
        <div className="stars mb-2">
          {[1, 2, 3, 4, 5].map((i) => {
            const filled = i <= Math.floor(note);
            const half = !filled && i - 0.5 <= note;

            return (
              <span
                key={i}
                className={`star ${filled ? "filled" : half ? "half" : ""}`}
              >
                ★
              </span>
            );
          })}
        </div>
        <p>
          {" "}
          <strong>Spécialité :</strong> {artisan.Specialite?.nom || "—"}
        </p>
        <p>
          <strong>Localisation :</strong> {artisan.ville || "—"}
        </p>
        {artisan.site_web && (
          <p>
            <strong>Site web :</strong>{" "}
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
            >
              {artisan.site_web}
            </a>
          </p>
        )}
      </div>

      {/* A propos */}
      <div className="mb-5">
        <h2>A propos</h2>
        <p>{artisan.a_propos || "Aucune description disponible."}</p>
      </div>
      {/* Formulaire de contact */}
      <div>
        <h2>Contacter {artisan.nom}</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Objet</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default FicheArtisan;
