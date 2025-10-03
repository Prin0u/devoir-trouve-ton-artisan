import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Composants
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home.jsx";
import Artisans from "./pages/Artisans.jsx";
import Categories from "./pages/Categories.jsx";
import Page404 from "./pages/Page404.jsx";

function App() {
  return (
    <Router>
      <Header />

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
