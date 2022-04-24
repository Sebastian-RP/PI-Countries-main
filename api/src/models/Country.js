const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      validate: { 
        isAlpha: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.REAL
    },
    population:{
      type: DataTypes.INTEGER
    }
  });
};
