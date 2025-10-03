import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.scss";

function Footer() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container">
        {/* Menu légal mobile */}
        <div className="d-lg-none text-center mb-3">
          <button
            className="btn btn-link fw-bold"
            onClick={toggleMenu}
            aria-expanded={open}
          >
            Infos légales {open ? "▲" : "▼"}
          </button>
          {open && (
            <ul className="list-unstyled mt-2">
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">Données personnelles</Link>
              </li>

              <li>
                <Link to="/accessibilite">Accessibilite</Link>
              </li>

              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          )}
        </div>
        {/* Menu légal desktop */}
        <ul className="list-inline mb-2 text-center d-none d-lg-flex">
          <li className="list-inline-item">
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li className="list-inline-item">
            <Link to="/donnees-personnelles">Données personnelles</Link>
          </li>
          <li className="list-inline-item">
            <Link to="/accessibilite">Accessibilité</Link>
          </li>
          <li className="list-inline-item">
            <Link to="/cookies">Cookies</Link>
          </li>
        </ul>
        {/* Texte d’attente pour pages légales */}
        <p className="text-center text-muted mb-3">Pages en construction</p>
        {/* Adresse et contact */}
        <div className="text-center">
          <p className="mb-0">101 cours Charlemagne</p>
          <p className="mb-0">CS 20033</p>
          <p className="mb-0">69269 LYON CEDEX 02, France</p>
          <p className="mb-0">+33 (0)4 26 73 40 00</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
