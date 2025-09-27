const Specialite = require("../models/specialite");
const Categorie = require("../models/categorie");

// Récupérer toutes les spécialités avec leur catégorie
exports.getAllSpecialites = async (req, res) => {
  try {
    const specialiteq = await Specialite.findAll({
      include: [{ model: Categorie }],
    });
    res.json(specialites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une spécialité par ID avec sa catégorie
exports.getSpecialiteById = async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [{ model: Categorie }],
    });

    if (!specialite)
      return res.status(404).json({ message: "Spécialité non trouvée" });

    res.json(specialite);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
