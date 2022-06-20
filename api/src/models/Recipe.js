const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('recipe', {
    recipe_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
  });
};

// [x] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Nivel de "comida saludable" (health score)
// Paso a paso
