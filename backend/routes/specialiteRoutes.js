const express = require("express");
const router = express.Router();
const specialiteController = require("../controllers/specialiteController");

// Récuperer toutes les spécialités
router.get("/", specialiteController.getAllSpecialites);

// Récupérer une spécialité par son ID
router.get("/:id", specialiteController.getSpecialiteById);

module.exports = router;
