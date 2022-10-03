const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    star_rating: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      validate: {
        min: 0.0,
        max: 5.0,
      },
    },
  });
};
