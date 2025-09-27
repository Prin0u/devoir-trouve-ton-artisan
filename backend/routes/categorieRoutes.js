const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");

// Récupérer toutes les catégories
router.get("/", categorieController.getAllCategories);

// Récupérer une catégorie avec son ID
router.get("/:id", categorieController.getCategoryById);

module.exports = router;
