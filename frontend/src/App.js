import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Composants
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home.jsx";
import Artisans from "./pages/Artisans.jsx";
import Page404 from "./pages/Page404.jsx";
import FicheArtisan from "./pages/FicheArtisan.jsx";

// Pages légales
import MentionsLegales from "./pages/MentionsLegales";
import DonneesPersonnelles from "./pages/DonneesPersonnelles";
import Accessibilite from "./pages/Accessibilite";
import Cookies from "./pages/Cookies";

function App() {
  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill container my-4">
          <Routes>
            <Route path="/" element={<Home key="home" />} />
            <Route path="/artisans" element={<Artisans key="artisans" />} />
            <Route
              path="/artisan/:id"
              element={<FicheArtisan key="fiche-artisan" />}
            />

            <Route
              path="/mentions-legales"
              element={<MentionsLegales key="mentions-legales" />}
            />
            <Route
              path="/donnees-personnelles"
              element={<DonneesPersonnelles key="donnees-personnelles" />}
            />
            <Route
              path="/accessibilite"
              element={<Accessibilite key="accessibilite" />}
            />
            <Route path="/cookies" element={<Cookies key="cookies" />} />
            <Route path="*" element={<Page404 key="page404" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
