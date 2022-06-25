const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Diet", {
    diet_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
};

// [x] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre