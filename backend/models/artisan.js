const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Specialite = require("./specialite");

const Artisan = sequelize.define(
  "Artisan",
  {
    id_artisan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: { type: DataTypes.STRING, allowNull: false },
    id_specialite: { type: DataTypes.INTEGER, allowNull: false },
    note: DataTypes.DECIMAL(2, 1),
    ville: DataTypes.STRING,
    a_propos: DataTypes.TEXT,
    email: DataTypes.STRING,
    site_web: DataTypes.STRING,
    top: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "artisan",
    timestamps: false,
  }
);

// Relation : chaque artisan appartient à une spécialité

Artisan.belongsTo(Specialite, { foreignKey: "id_specialite" });
Specialite.hasMany(Artisan, { foreignKey: "id_specialite" });

module.exports = Artisan;
