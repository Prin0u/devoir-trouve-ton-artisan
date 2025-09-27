const Artisan = require("../models/artisan");
const Specialite = require("../models/specialite");

// Récupérer tout les artisans avec leur spécialité

exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{ model: Specialite, attributes: ["nom_specialite"] }],
    });
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Récupérer un artisan par id

exports.getArtisansById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{ model: Specialite, attributes: ["nom_specialite"] }],
    });
    if (!artisan)
      return res.status(404).json({ message: "Artisan non trouvé" });
    res.json(artisan);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Créer un artisan
exports.createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create(req.body);
    res.status(201).json(artisan);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Modifier un artisan par id

exports.updateArtisan = async (req, res) => {
  try {
    const [updated] = await Artisan.update(req.body, {
      where: { id_artisan: req.params.id },
    });

    if (!updated)
      return res.status(404).json({ message: "Artisan non trouvé" });

    const updatedArtisan = await Artisan.findByPk(req.params.id);
    res.json(updatedArtisan);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un artisan par id
exports.deleteArtisan = async (req, res) => {
  try {
    const deleted = await Artisan.destroy({
      where: { id_artisan: req.params.id },
    });

    if (!deleted)
      return res.status(404).json({ message: "Artisan non trouvé" });

    res.json({ message: "Artisan supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
