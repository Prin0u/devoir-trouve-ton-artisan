import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.scss";

function Footer() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <footer className="footer py-1 mt-auto border-top">
      <div className="container text-center">
        {/* Menu légal - version desktop */}
        <ul className="list-inline mb-3 d-none d-lg-flex justify-content-center">
          <li className="list-inline-item mx-2">
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/donnees-personnelles">Données personnelles</Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/accessibilite">Accessibilité</Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/cookies">Cookies</Link>
          </li>
        </ul>

        {/* Menu légal - version mobile */}
        <div className="d-lg-none mb-3">
          <button
            className="btn btn-link fw-bold"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="legalMenu"
          >
            Infos légales {open ? "▲" : "▼"}
          </button>
          {open && (
            <ul id="legalMenu" className="list-unstyled mt-2">
              <li>
                <Link to="/mentions-legales" onClick={() => setOpen(false)}>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/donnees-personnelles" onClick={() => setOpen(false)}>
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link to="/accessibilite" onClick={() => setOpen(false)}>
                  Accessibilité
                </Link>
              </li>
              <li>
                <Link to="/cookies" onClick={() => setOpen(false)}>
                  Cookies
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Adresse / contact */}
        <div className="text-muted small">
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
