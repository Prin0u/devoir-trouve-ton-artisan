import React from "react";
import "../styles/legales.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function DonneesPersonnelles() {
  return (
    <div className="container my-5 text-center">
      <Helmet>
        <title>Données personnelles | Trouve ton artisan</title>
      </Helmet>
      <h1 className="text-center py-5">Données personnelles</h1>
      <p>Page en construction</p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default DonneesPersonnelles;
