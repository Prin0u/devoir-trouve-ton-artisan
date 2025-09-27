const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Categorie = require("./categorie");

const Specialite = sequelize.define(
  "Specialite",
  {
    id_specialite: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: { type: DataTypes.STRING, allowNull: false },
    id_categorie: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "specialite",
    timestamps: false,
  }
);

// Relation : chaque spécialité appartient à une catégorie

Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });
Categorie.hasMany(Specialite, { foreignKey: "id_categorie" });

module.exports = Specialite;
