require("dotenv").config();
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const artisanRoutes = require("./routes/artisanRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const specialiteRoutes = require("./routes/specialiteRoutes");
const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/specialites", specialiteRoutes);

// Route test pour vérifier que l'API fonctionne
app.get("/", (req, res) => {
  res.send("API Trouve ton artisan fonctionne");
});

// Route 404 si aucune route ne correspond
app.use((req, res) => {
  res.status(404).json({ message: "Page non trouvée" });
});

// Lancement du serveur et de la base de données
const PORT = process.env.PORT || 5001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie");
    app.listen(PORT, () =>
      console.log(`Serveur lancé sur http://localhost:${PORT}`)
    );
  })
  .catch((err) =>
    console.error("Impossible de se connecter à la base de données", err)
  );
