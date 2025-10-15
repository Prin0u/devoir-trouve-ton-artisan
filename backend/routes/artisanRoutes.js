const express = require("express");
const router = express.Router();
const Artisan = require("../models/artisan");
const Specialite = require("../models/specialite");
const Categorie = require("../models/categorie");
const { Op } = require("sequelize");

// Route pour la recherche par nom

router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name)
      return res.status(400).json({ message: "Veuillez fournir un nom" });

    const artisans = await Artisan.findAll({
      where: { nom: { [Op.like]: `%${name}%` } },
      include: { model: Specialite, include: Categorie },
    });

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer tout les artisans avec leur spécialité et catégorie

router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: Categorie,
      },
    });
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer un artisan avec son ID

router.get("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: { model: Specialite, include: Categorie },
    });

    if (!artisan)
      return res.status(404).json({ message: "Artisan non trouvé" });

    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer les artisans du mois
router.get("/top", async (req, res) => {
  try {
    const topArtisans = await Artisan.findAll({
      where: { top: true },
      limit: 3,
    });
    res.json(topArtisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Créer un artisan

router.post("/", async (req, res) => {
  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier un artisan

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Artisan.update(req.body, {
      where: { id_artisan: req.params.id },
    });

    if (!updated)
      return res.status(404).json({ message: "Artisan non trouvé" });

    const updatedArtisan = await Artisan.findByPk(req.params.id);
    res.json(updatedArtisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur " });
  }
});

// Supprimer un artisan

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Artisan.destroy({
      where: { id_artisan: req.params.id },
    });

    if (!deleted)
      return res.status(404).json({ message: "Artisan non trouvé" });

    res.json({ message: "Artisan supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
module.exports = router;
