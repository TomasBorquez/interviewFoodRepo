const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0.0,
        max: 100.0,
      },
    },
    steps: {
      type: DataTypes.TEXT,
    },
    amount_reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    average_reviews: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });
};

// ID: *
// Nombre *
// Resumen del plato *
// Nivel de "comida saludable" (health score)
// Paso a paso
