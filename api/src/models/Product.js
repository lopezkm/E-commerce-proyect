const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'no description'
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    media: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'game media'
    },
    developer: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'developer'
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'publisher'
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  });
};

