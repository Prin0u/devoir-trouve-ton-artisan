import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import "../styles/ficheartisans.scss";
import imageDefault from "../assets/image-artisan.jpg";

function FicheArtisan() {
  // Récupération de l'ID depuis l'URL
  const { id } = useParams();

  // States pour stocker l'artisan, l'état de chargement et les erreurs
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données d'un artisan via l'API
    const fetchArtisan = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/artisans/${id}`);
        if (!res.ok) throw new Error("Erreur lors du chargement"); // Gestion des erreurs HTTP
        const data = await res.json();
        setArtisan(data); // Stockage des données dans le state
      } catch (err) {
        setError(err.message); // Stockage du message d'erreur
      } finally {
        setLoading(false); // Fin du chargement, qu'il y ait une erreur ou non
      }
    };

    fetchArtisan();
  }, [id]); // Se déclenche à chaque changement d'ID (navigation vers un autre artisan)

  // Affichage conditionnel pendant le chargement ou en cas d'erreur
  if (loading) return <p className="text-center">Chargement de la fiche...</p>;
  if (error) return <p className="text-center">{error}</p>;
  if (!artisan) return <p className="text-center">Aucun artisan trouvé.</p>;

  const note = parseFloat(artisan.note) || 0; // Note de l'artisan, 0 par défaut
  const imageSrc =
    artisan.image && artisan.image.trim() !== "" ? artisan.image : imageDefault; // Choix de l'image

  return (
    <div className="container my-5 fiche-artisan">
      {/* Helmet permet de définir dynamiquement le titre et la meta description de la page */}
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

      <div className="d-flex flex-column flex-md-row align-items-start mb-4 header-section">
        {/* Nom de l'artisan */}
        <div className="flex-grow-1 ">
          <h1 className="mb-3 mb-md-0">{artisan.nom}</h1>
        </div>

        {/* Image de l'artisan */}
        <div className="ms-md-3 text-md-end">
          <img src={imageSrc} alt={artisan.nom} className="image-default" />
        </div>
      </div>

      {/* Infos principales */}
      <div className="mb-4">
        {/* Affichage des étoiles en fonction de la note */}
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

        {/* Spécialité et localisation */}
        <p>
          <strong>Spécialité :</strong> {artisan.Specialite?.nom || "—"}
        </p>
        <p>
          <strong>Localisation :</strong> {artisan.ville || "—"}
        </p>

        {/* Lien vers le site web si disponible */}
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

          {/* Bouton d'envoi */}
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default FicheArtisan;
