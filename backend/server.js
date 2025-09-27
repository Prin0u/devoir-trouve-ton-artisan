require("dotenv").config();
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const artisanRoutes = require("./routes/artisanRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/artisans", artisanRoutes);

app.get("/", (req, res) => {
  res.send("API Trouve ton artisan fonctionne");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
);
