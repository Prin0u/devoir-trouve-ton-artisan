const Categorie = require("../models/categorie");
const Specialite = require("../models/specialite");

// Récupérer toutes les catégories avec leurs spécialités

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{ model: Specialite }],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur " });
  }
};

// Récupérer une catégorie par ID avec ses spécialités

exports.getCategoryById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id, {
      include: [{ model: Specialite }],
    });

    if (!categorie)
      return res.status(404).json({ message: "Catégorie non trouvée" });

    res.json(categorie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
