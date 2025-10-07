import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/Header.scss";
import "normalize.css";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(search)}`);
    }
  };

  const categories = ["Bâtiment", "Services", "Fabrication", "Alimentation"];

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid header-flex">
          {/* Logo */}
          <Link className="navbar-brand fw-bold" to="/">
            <img src={Logo} alt="Trouve ton artisan" height="40" />
          </Link>

          {/* Menu burger pour mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens et formulaire de recherche */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Menu des catégories */}
            <ul className="navbar-nav menu-center mb-2 mb-lg-0">
              {categories.map((cat) => (
                <li className="nav-item" key={cat}>
                  <Link
                    className="nav-link"
                    to={`/artisans?categorie=${encodeURIComponent(cat)}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Formulaire de recherche */}
            <form className="search-form d-flex" onSubmit={handleSubmit}>
              <input
                className="form-control rounded-pill"
                type="search"
                placeholder="Rechercher un artisan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
