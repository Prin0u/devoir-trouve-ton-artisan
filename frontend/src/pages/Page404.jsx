import React from "react";
import { Link } from "react-router-dom";
import "../styles/Page404.scss";
import { Helmet } from "react-helmet";
import NotFoundImg from "../assets/404.png";

function Page404() {
  return (
    <div className="container text-center my-5 page-404">
      {/* Helmet permet de définir dynamiquement le titre et la meta description de la page */}

      <Helmet>
        <title>404 - Page non trouvée | Trouve ton artisan</title>
        <meta
          name="description"
          content="La page que vous recherchez n'existe pas. Retournez à l'accueil"
        />
      </Helmet>
      {/* Image */}
      <img
        src={NotFoundImg}
        alt="Erreur 404 - Page non trouvée"
        className="img-fluid mb-4"
      />
      {/* Texte */}
      <p className="text-muted mb-4">
        La page que vous avez demandée n'existe pas ou a été déplacée.
      </p>
      {/* Bouton retour à l'accueil */}
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default Page404;
