import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../styles/legales.scss";

function MentionsLegales() {
  return (
    <div className="container my-5 text-center">
      <Helmet>
        <title>Mentions Légales | Trouve ton artisan</title>
      </Helmet>
      <h1 className="text-center py-5">Mentions légales</h1>
      <p>Page en construction</p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default MentionsLegales;
